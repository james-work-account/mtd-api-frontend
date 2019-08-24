package controllers

import javax.inject._
import play.api.mvc._
import services.DocumentationService

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class HomeController @Inject()(service: DocumentationService, cc: ControllerComponents) extends AbstractController(cc) {

  def index = Action {
        Ok(views.html.pages.index("Home", service.apiList))

  }

}
