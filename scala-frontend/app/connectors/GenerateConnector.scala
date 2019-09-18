package connectors

import java.nio.charset.StandardCharsets
import java.util

import com.google.inject.{ImplementedBy, Inject}
import javax.inject.Singleton
import models.NewUser
import models.errors.BadUserException
import org.jsoup.{Connection, Jsoup}
import play.api.Logger
import play.api.libs.json.{JsArray, Json, Reads}
import play.api.libs.ws.WSClient

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@ImplementedBy(classOf[GenerateConnectorImpl])
trait GenerateConnector {
  def info(msg: String): Unit = Logger.logger.info(s"[GenerateConnector] $msg")
  def generateUser(userType: String): Future[NewUser]
  def grantAccess(userId: String, password: String): Future[String]
  def requestAccessToken(oauthToken: String): Future[String]
}

@Singleton
class GenerateConnectorImpl @Inject()(ws: WSClient) extends GenerateConnector {

  private val serviceArray = Seq("mtd-income-tax", "mtd-vat")

  override def generateUser(userType: String): Future[NewUser] = {
    info(s"[generateUser] - Generating new user of type [$userType]")
    val url = s"https://test-api.service.hmrc.gov.uk/create-test-user/$userType"
    val body = Json.obj("serviceNames" -> serviceArray)
    val headers = Seq(
      ("Accept", "application/vnd.hmrc.1.0+json"),
      ("Authorization", "Bearer db8e884897a9347426f6a2c94dca566"),
      ("Content-Type", "application/json")
    )
    ws.url(url).withHttpHeaders(headers: _*).post(body).map {
      response =>
        val x = response.body
        response.status match {
          case 201 => Json.fromJson[NewUser](response.json).get
          case _ => throw new BadUserException("Unable to generate a new user")
        }
    }.recover {
      case e =>
        Logger.logger.error(e.getMessage, e)
        throw new BadUserException("Unable to generate a new user")
    }
  }

  override def grantAccess(userId: String, password: String): Future[String] = {
    info(s"[grantAccess] - Granting access to new user [$userId]")
    val USER_AGENT = "\"Mozilla/5.0 (Windows NT\" +\n          \" 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2\""
    val saScopes = "read:self-assessment+write:self-assessment+write:sent-invitations"
    val vatScopes = "read:vat+write:vat+write:sent-invitations"
    val firstPageUrl = s"https://test-www.tax.service.gov.uk/oauth/authorize?client_id=5Z9oOif4hw8hlZlWXIwUH0YBwKsa&scope=${saScopes}+${vatScopes}&response_type=code&redirect_uri=http://localhost:9000&state=12345"

    Future {
      // First page - start
      val firstForm = Jsoup.connect(firstPageUrl).method(Connection.Method.GET).userAgent(USER_AGENT).execute()
      val firstPage = firstForm.parse()
      val firstPageButtonLink = firstPage.selectFirst(".button").attr("href")
      val firstPageCookies = firstForm.cookies()

      // Second page - Sign in
      val secondForm = Jsoup.connect(s"https://test-www.tax.service.gov.uk$firstPageButtonLink")
        .method(Connection.Method.GET)
        .cookies(firstPageCookies)
        .userAgent(USER_AGENT)
        .execute()
      val secondPage = secondForm.parse()
      val secondPageCsrfToken = secondPage.selectFirst("input[name=csrfToken]").attr("value")
      val continue = secondPage.selectFirst("input[name=continue]").attr("value")
      val secondPageCookies = secondForm.cookies()

      // Third page - grant authority confirmation
      val thirdFormBody: util.HashMap[String, String] = new util.HashMap[String, String]() {{
        put("csrfToken", secondPageCsrfToken)
        put("continue", continue)
        put("userId", userId)
        put("password", password)
      }}
      val thirdForm = Jsoup.connect("https://test-www.tax.service.gov.uk/api-test-login/sign-in")
        .cookies(secondPageCookies)
        .data(thirdFormBody)
        .method(Connection.Method.POST)
        .userAgent(USER_AGENT)
        .execute()
      val thirdPage = thirdForm.parse() // I honestly didn't expect to get this far...
      val thirdPageCsrfToken = thirdPage.selectFirst("input[name=csrfToken]").attr("value")
      val thirdPageAuthId = thirdPage.selectFirst("input[name=auth_id]").attr("value")
      val thirdPageState = thirdPage.selectFirst("input[name=state]").attr("value")
      val thirdPageCookies = thirdForm.cookies()

      val fourthFormBody: util.HashMap[String, String] = new util.HashMap[String, String]() {{
        put("csrfToken", thirdPageCsrfToken)
        put("auth_id", thirdPageAuthId)
        put("state", thirdPageState)
      }}
      val fourthForm = Jsoup.connect("https://test-www.tax.service.gov.uk/oauth/grantscope")
        .cookies(thirdPageCookies)
        .data(fourthFormBody)
        .method(Connection.Method.POST)
        .userAgent(USER_AGENT)
        .execute()

      fourthForm.url.toString.replaceAll("^.*code=(.*)&.*$", "$1")
    }
  }

  override def requestAccessToken(oauthToken: String): Future[String] = {
    info(s"[requestAccessToken] Requesting access token")
    ws.url("https://test-www.tax.service.gov.uk/oauth/token").post(Json.parse(
      s"""
         |{
         |    "client_id": "5Z9oOif4hw8hlZlWXIwUH0YBwKsa",
         |    "client_secret": "adb75b05-714e-44c8-986f-59fe1c566736",
         |    "grant_type": "authorization_code",
         |    "code": "$oauthToken",
         |    "redirect_uri": "http://localhost:9000"
         |  }
         |""".stripMargin)).map {
      response =>
        (response.json \ "access_token").asOpt[String] match {
          case Some(token) => s"Bearer $token"
          case None => ""
        }
    }
  }
}
