package connectors

import com.google.inject.ImplementedBy
import javax.inject.Inject
import play.api.Logger
import play.api.libs.json.{JsObject, JsValue}
import play.api.libs.ws.WSClient

import scala.concurrent.Future

class IncorrectMethodError(msg: String) extends Exception(msg)

@ImplementedBy(classOf[ApiConnectorImpl])
trait ApiConnector {
  def sendRequest(url: String, method: String, body: Option[JsValue], headers: JsObject): Future[JsValue]
}

class ApiConnectorImpl  @Inject()(implicit val ws: WSClient) extends ApiConnector {
  override def sendRequest(url: String, method: String, optionalBody: Option[JsValue], headers: JsObject): Future[JsValue] = {
    (method, optionalBody) match {
      case ("GET" | "DELETE", None) => handleJson(url, headers.as[Map[String, String]].toSeq, method)
      case ("GET" | "DELETE", Some(_)) =>
        Logger.logger.warn(s"Unnecessary body sent with $method HTTP verb")
        handleJson(url, headers.as[Map[String, String]].toSeq, method)
      case ("POST" | "PUT", Some(body)) => handleJson(url, headers.as[Map[String, String]].toSeq, method, body)
      case ("POST" | "PUT", None) => throw new IncorrectMethodError(s"Body required for $method HTTP verb")
      case (_, _) => throw new IncorrectMethodError(s"Unrecognised HTTP verb $method")
    }
  }
}
