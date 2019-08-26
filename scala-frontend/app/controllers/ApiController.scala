package controllers

import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import services.DocumentationService

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class ApiController @Inject()(service: DocumentationService, cc: ControllerComponents) extends AbstractController(cc) {

  def index(api: String): Action[AnyContent] = Action.async {
    service.endpointList(api).map {
      serviceOutcome =>
        val apiList = serviceOutcome.apis
        val message = apiList.find(_.name == api).map(_.friendly_name).getOrElse("")
        val selectedApi = apiList.find(_.name == api)
        val endpointList = serviceOutcome.endpoints

        Ok(views.html.pages.endpointList(message, apiList, endpointList, selectedApi))
    }

  }

  def endpointGet(api: String, endpoint: String): Action[AnyContent] = Action.async {
    service.endpoint(api, endpoint).map {
      serviceOutcome =>
        Ok(serviceOutcome.toString)
    }
  }

}
