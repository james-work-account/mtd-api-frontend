package connectors

import com.google.inject.ImplementedBy
import javax.inject.{Inject, Singleton}
import models.errors.ConnectorException
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import play.api.Logger
import play.api.libs.ws.WSClient

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@ImplementedBy(classOf[DocumentationConnectorImpl])
trait DocumentationConnector {
  def info(msg: String): Unit = Logger.logger.info(s"[DocumentationConnector] $msg")
  def getApiList: Future[Document]
  def getApiEndpoint(api: String): Future[Document]
}

@Singleton
class DocumentationConnectorImpl @Inject()(implicit val ws: WSClient) extends DocumentationConnector {
  override def getApiList: Future[Document] = {
    info(s"[getApiList] - Getting API list")
    handleDocument("https://developer.service.hmrc.gov.uk/api-documentation/docs/api")
  }

  override def getApiEndpoint(api: String): Future[Document] = {
    info(s"[getApiEndpoint] - Getting API information for [$api]")
    handleDocument(s"https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/${api}")
  }

}