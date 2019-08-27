package connectors

import com.google.inject.ImplementedBy
import javax.inject.Inject
import play.api.libs.json.{JsObject, JsValue}
import play.api.libs.ws.WSClient

import scala.concurrent.Future

case class IncorrectMethodError(msg: String) extends Exception

@ImplementedBy(classOf[ApiConnectorImpl])
trait ApiConnector {
  def sendRequest(url: String, method: String, body: Option[JsValue], headers: JsObject): Future[JsValue]
}

class ApiConnectorImpl  @Inject()(implicit val ws: WSClient) extends ApiConnector {
  override def sendRequest(url: String, method: String, body: Option[JsValue], headers: JsObject): Future[JsValue] = {
    method match {
      case "GET" | "DELETE" => handleJson(url, headers.as[Map[String, String]].toSeq, method)
      case "POST" | "PUT" if body.nonEmpty => handleJson(url, headers.as[Map[String, String]].toSeq, method, body.get)
      case _ => Future.failed(IncorrectMethodError("Unrecognised method: " + method))
    }
  }
}
