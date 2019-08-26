package services

import com.google.inject.ImplementedBy
import connectors.DocumentationConnector
import javax.inject.Inject
import models.ApiListItem
import org.jsoup.nodes.Document
import org.jsoup.select.{NodeFilter, NodeVisitor}
import play.api.Logger
import play.api.libs.json.Json

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@ImplementedBy(classOf[DocumentationServiceImpl])
trait DocumentationService {
  def apiList: Future[ApisOutcome]

  def endpointList(api: String): Future[EndpointsListOutcome]

  def endpoint(api: String, endpoint: String): EndpointOutcome
}

class DocumentationServiceImpl @Inject()(connector: DocumentationConnector) extends DocumentationService {
  override def apiList: Future[ApisOutcome] = {
    if (apis.isDefined) Future.successful(apis.get) else {
      for {
        doc: Document <- connector.getApiList
      } yield {
        val els = doc.getElementById("content").select("td > a[href*=/service/]")
        val friendly_names = els.eachText().toArray.toSeq.map(_.toString)
        val names = els.eachAttr("href").toArray.toSeq.map(_.toString()).map(_.replaceAll("/.+/docs/api/service/(.*)/.+", "$1"))
        val list = (names zip friendly_names).map {
          case (n, fn) => ApiListItem(n, fn)
        }
        apis = Some(list)
        list
      }
    }
  }

  override def endpointList(api: String): Future[EndpointsListOutcome] = {
    val apiListFuture: Future[ApisOutcome] = if (apis.isDefined) Future.successful(apis.get) else apiList
    val endpointListFuture: Future[Seq[ApiListItem]] = if(endpointsList.get(api).isDefined) Future.successful(endpointsList(api)) else {
      Logger.logger.info(s"Getting information for [$api]")
      val pageOption = (apiPages.get(api))
      val document: Future[Document] = (if (pageOption.isDefined) Future.successful(pageOption.get.asInstanceOf[Document]) else connector.getApiEndpoint(api))
      document.map {
        doc =>
          // Add doc to Map of pages
          if (pageOption.isEmpty) apiPages += (api -> doc)

          val els = doc.getElementById("section").select(".section div.endpoint_group > div > div > div.persist-area")
          val friendly_names = els.select("div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > span:nth-child(2)").eachText().toArray.toSeq.map(_.toString())
          val names = els.select("div[id]").eachAttr("id").toArray.toSeq.map(_.toString())
          val l: Seq[ApiListItem] = (names zip friendly_names).map {
            case (n, fn) => ApiListItem(n, fn)
          }
          endpointsList += (api -> l)
          l
      }
    }

    for {
      listOfApis: Seq[ApiListItem] <- apiListFuture
      list: Seq[ApiListItem] <- endpointListFuture
    } yield {
      EndpointsListOutcome(listOfApis, list)
    }
  }

  override def endpoint(api: String, endpoint: String): EndpointOutcome = {
    val listOfApis = apis.getOrElse(apiList)
    val listOfEndpoints = endpointsList.getOrElse(api, endpointList(api))
    val pageOption = (apiPages.get(api))
    val doc: Document = pageOption.getOrElse(connector.getApiEndpoint(api)).asInstanceOf[Document]

    // Add doc to Map of pages
    if (pageOption.isEmpty) apiPages += (api -> doc)


    val api_friendly_name = doc.title().split(" - ").headOption.getOrElse("")
    val baseUrl = doc.getElementById("section").select("table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(2)").text()
    println(scala.Console.YELLOW + baseUrl + scala.Console.RESET)

    ???

  }


}
