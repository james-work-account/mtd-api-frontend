package controllers

import javax.inject._
import play.api.Logger
import play.api.mvc._
import services.DocumentationService

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class HomeController @Inject()(service: DocumentationService, cc: ControllerComponents) extends AbstractController(cc) {

  def index: Action[AnyContent] = Action.async {
    implicit request =>
      service.apiList.map {
        list =>
          Ok(views.html.pages.index("Home", list))
    }.recover {
      case ex =>
        Logger.logger.error(ex.getMessage, ex)
        InternalServerError(views.html.pages.internalServerError())
    }

  }

}
