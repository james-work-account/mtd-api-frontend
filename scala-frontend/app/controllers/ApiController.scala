package controllers

import connectors.ApiConnector
import javax.inject.{Inject, Singleton}
import play.api.Logger
import play.api.libs.json.{JsObject, JsValue, Json}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import services.DocumentationService

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class ApiController @Inject()(connector: ApiConnector, service: DocumentationService, cc: ControllerComponents) extends AbstractController(cc) {

  def index(api: String): Action[AnyContent] = Action.async {
    implicit request =>
      service.endpointList(api).map {
        serviceOutcome =>
          val apiList = serviceOutcome.apis
          val message = apiList.find(_.name == api).map(_.friendly_name).getOrElse("")
          val selectedApi = apiList.find(_.name == api)
          val endpointList = serviceOutcome.endpoints

          Ok(views.html.pages.endpointList(message, apiList, endpointList, selectedApi))
      }.recover {
        case ex =>
          Logger.logger.error(ex.getMessage, ex)
          InternalServerError(views.html.pages.internalServerError())
      }

  }

  def endpointGet(api: String, endpoint: String): Action[AnyContent] = Action.async { implicit request =>
    service.endpoint(api, endpoint).map {
      serviceOutcome =>
        val apiList = serviceOutcome.apis
        val message = apiList.find(_.name == api).map(_.friendly_name).getOrElse("")
        val selectedApi = apiList.find(_.name == api)
        val endpointList = serviceOutcome.endpoints
        val endpoint = serviceOutcome.endpoint

        val defaults: Option[JsObject] = request.session.get("Defaults").map(Json.parse).flatMap(_.asOpt[JsObject])
        Ok(views.html.pages.individualEndpoint(message, defaults, apiList, endpointList, selectedApi, endpoint, request.host))
    }.recover {
      case ex =>
        Logger.logger.error(ex.getMessage, ex)
        InternalServerError(views.html.pages.internalServerError())
    }
  }

  /** Body format:
   *
   * {
   *   url (full, with all query parameters)
   *   headers {
   *     k: v (for each header)
   *   }
   *   body (if method is POST or PUT)
   * }
   *
   */
  def send(api: String, endpoint: String, method: String): Action[JsValue] = Action.async(parse.json) { implicit request =>
    {
      request.body match {
        case body =>
          val urlO: Option[String] = (body \\ "url").headOption.map(_.as[String])
          val headersO: Option[JsObject] = (body \\ "headers").headOption.flatMap(_.asOpt[JsObject])
          val postOrPutBody = if(checkMethod(method)) (body \\ "body").headOption else None
          (urlO, headersO, postOrPutBody) match {
            case (Some(url), Some(headers), optionalBody) =>
              connector.sendRequest(url, method, optionalBody, headers).map(Ok(_))
            case (_, _, _) => Future.successful(Redirect(routes.ApiController.endpointGet(api, endpoint)))
          }
      }
    }.recover {
      case ex =>
        Logger.logger.error(ex.getMessage, ex)
        InternalServerError(views.html.pages.internalServerError())
    }
  }

  private def checkMethod(method: String): Boolean = method == "POST" || method == "PUT"

}
