package connectors

import com.google.inject.ImplementedBy
import config.AppConfig
import javax.inject.{Inject, Singleton}
import models.{Api, ApiListItem}
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import play.api.libs.json.Reads
import play.api.libs.ws.WSClient

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@ImplementedBy(classOf[DocumentationConnectorImpl])
trait DocumentationConnector {
  def getApiList: Document
  def getApiEndpointList(api: String): Document
  def getApiEndpoint(api: String): Future[Api] = Future.successful(Api("","",Seq()))
}

@Singleton
class DocumentationConnectorImpl @Inject()(ws: WSClient, appConfig: AppConfig) extends DocumentationConnector {
  override def getApiList: Document = {
    get[Seq[ApiListItem]]("https://developer.service.hmrc.gov.uk/api-documentation/docs/api")
  }

  override def getApiEndpointList(api: String): Document = {
    get[Seq[ApiListItem]](s"https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/${api}")
  }
//
//  override def getApiEndpoint(api: String): Future[Api] = {
//    get[Api](s"/apis/api-info/$api", Api("", "", Seq()))
//  }

  private def get[T](url: String): Document = {
    Jsoup.connect(url).ignoreContentType(true).get()
  }

}