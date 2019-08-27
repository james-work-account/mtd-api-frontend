package connectors

import com.google.inject.ImplementedBy
import javax.inject.{Inject, Singleton}
import models.errors.ConnectorError
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import play.api.Logger
import play.api.libs.ws.WSClient

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@ImplementedBy(classOf[DocumentationConnectorImpl])
trait DocumentationConnector {
  def getApiList: Future[Document]
  def getApiEndpoint(api: String): Future[Document]
}

@Singleton
class DocumentationConnectorImpl @Inject()(implicit val ws: WSClient) extends DocumentationConnector {
  override def getApiList: Future[Document] = {
    handleDocument("https://developer.service.hmrc.gov.uk/api-documentation/docs/api")
  }

  override def getApiEndpoint(api: String): Future[Document] = {
    handleDocument(s"https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/${api}")
  }

}