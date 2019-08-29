package controllers

import javax.inject.{Inject, Singleton}
import play.api.Logger
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, Call, ControllerComponents}
import services.GenerateService

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class GenerateController @Inject()(service: GenerateService, cc: ControllerComponents) extends AbstractController(cc) {
  def index: Action[AnyContent] = Action.async {
    implicit request =>
      service.generate.map {
        res =>
          val refererOpt = request.headers.get("Referer")
          refererOpt match {
            case Some(referer) =>
              Redirect(referer).addingToSession(("Defaults" -> Json.toJson(res).toString()))
            case None => Ok(Json.prettyPrint(Json.toJson(res)))
          }

      }.recover {
        case ex =>
          Logger.logger.error(ex.getMessage, ex)
          InternalServerError(views.html.pages.internalServerError())
      }
  }
}
