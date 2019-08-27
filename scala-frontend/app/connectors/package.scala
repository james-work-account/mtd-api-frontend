import models.errors.ConnectorError
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import play.api.Logger
import play.api.libs.json.{JsValue, Json}
import play.api.libs.ws.{WSClient, WSRequest, WSResponse}

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

package object connectors {

  def handleDocument(url: String, headers: Seq[(String, String)] = Seq(), method: String = "GET")(implicit ws: WSClient): Future[Document] = {
    get(url, transformDocument, headers)
  }

  def handleJson(url: String, headers: Seq[(String, String)], method: String, body: JsValue = Json.obj())(implicit ws: WSClient): Future[JsValue] = {
    method match {
      case "GET" => get(url, transformJson, headers)
      case "POST" => post(url, transformJson, headers, body)
      case "PUT" => put(url, transformJson, headers, body)
      case "DELETE" => delete(url, transformJson, headers)
    }
  }

  private def get[T](url: String, transformation: WSResponse => T, headers: Seq[(String, String)])(implicit ws: WSClient): Future[T] = {
    withRecover(ws.url(url).addHttpHeaders(headers: _*).get().map {
      response =>
        transformation(response)
    })
  }

  private def post[T](url: String, transformation: WSResponse => T, headers: Seq[(String, String)], body: JsValue)(implicit ws: WSClient): Future[T] = {
    withRecover(ws.url(url).addHttpHeaders(headers: _*).post(body).map {
      response =>
        transformation(response)
    })
  }

  private def put[T](url: String, transformation: WSResponse => T, headers: Seq[(String, String)], body: JsValue)(implicit ws: WSClient): Future[T] = {
    withRecover(ws.url(url).addHttpHeaders(headers: _*).put(body).map {
      response =>
        transformation(response)
    })
  }

  private def delete[T](url: String, transformation: WSResponse => T, headers: Seq[(String, String)])(implicit ws: WSClient): Future[T] = {
    withRecover(ws.url(url).addHttpHeaders(headers: _*).delete().map {
      response =>
        transformation(response)
    })
  }

  private def transformDocument(res: WSResponse): Document = Jsoup.parse(res.body)

  private def transformJson(res: WSResponse): JsValue = {
    Json.obj("status" -> res.status, "data" -> Json.parse(res.body))
  }

  private def withRecover[T](f: Future[T]): Future[T] = f.recover {
    case ex =>
      Logger.logger.error(ex.getMessage, ex)
      throw ConnectorError(ex.getMessage, ex)
  }

}
