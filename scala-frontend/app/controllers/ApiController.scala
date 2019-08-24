package controllers

import connectors.DocumentationConnector
import javax.inject.{Inject, Singleton}
import models.{Api, ApiListItem}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import services.DocumentationService

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class ApiController @Inject()(service: DocumentationService, cc: ControllerComponents) extends AbstractController(cc) {

  def index(api: String): Action[AnyContent] = Action {
//    for {
//      apiList <- documentationConnector.getApiList
//      endpointList <- documentationConnector.getApiEndpointList(api)
//    } yield {
//      val selectedApi = apiList.find(_.name == api)
//      Ok(views.html.pages.endpointList(selectedApi.getOrElse(ApiListItem("", "")).friendly_name, apiList, endpointList, selectedApi))
//    }
    val serviceOutcome = service.endpointList(api)
    val apiList = serviceOutcome.apis
    val message = apiList.find(_.name == api).map(_.friendly_name).getOrElse("")
    val selectedApi = apiList.find(_.name == api)
    val endpointList = serviceOutcome.endpoints

    Ok(views.html.pages.endpointList(message, apiList, endpointList, selectedApi))
  }

  def endpointGet(api: String, endpoint: String): Action[AnyContent] = Action.async {
//    for {
//      apiList <- documentationConnector.getApiList
//      apiInfo <- documentationConnector.getApiEndpoint(api)
//      apiWithSingleEndpoint = Api(apiInfo.baseUrl, apiInfo.friendly_name, apiInfo.endpoints.filter(_.name == endpoint))
//    } yield {
//      Ok
//    }
    Future.successful(Ok)
  }

}
