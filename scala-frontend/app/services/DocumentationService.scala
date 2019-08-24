package services

import com.google.inject.ImplementedBy
import connectors.DocumentationConnector
import javax.inject.Inject
import models.ApiListItem
import org.jsoup.nodes.Document
import org.jsoup.select.{NodeFilter, NodeVisitor}
import play.api.Logger
import play.api.libs.json.Json

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@ImplementedBy(classOf[DocumentationServiceImpl])
trait DocumentationService {
  def apiList: ApisOutcome
  def endpointList(api: String): EndpointsListOutcome
}

class DocumentationServiceImpl @Inject()(connector: DocumentationConnector) extends DocumentationService {
  override def apiList: Seq[ApiListItem] = {
    if(apis.isDefined) apis.get else {
      val doc: Document = connector.getApiList
      val els = doc.getElementById("content").select("td > a[href*=/service/]")
      val friendly_names = els.eachText().toArray.toSeq.map(_.toString)
      val names = els.eachAttr("href").toArray.toSeq.map(_.toString()).map(_.replaceAll("/.+/docs/api/service/(.*)/.+", "$1"))
      val list = (names zip friendly_names).map{
        case (n, fn) => ApiListItem(n, fn)
      }
      apis = Some(list)
      list
    }
  }

  override def endpointList(api: String): EndpointsListOutcome = {
    val listOfApis = apis.getOrElse(apiList)
    val list = endpointsList.getOrElse (api, {
      Logger.logger.info(s"Getting information for [$api]")
      val pageOption = (apiPages.get(api))
      val doc: Document = pageOption.getOrElse(connector.getApiEndpointList(api)).asInstanceOf[Document]

      // Add doc to Map of pages
      if (pageOption.isEmpty) apiPages += (api -> doc)

      val els = doc.getElementById("section").select(".section div.endpoint_group > div > div > div.persist-area")
      val friendly_names = els.select("div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > span:nth-child(2)").eachText().toArray.toSeq.map(_.toString())
      val names = els.select("div[id]").eachAttr("id").toArray.toSeq.map(_.toString())
      val l = (names zip friendly_names).map {
        case (n, fn) => ApiListItem(n, fn)
      }
      endpointsList += (api -> l)
      l
    })
    EndpointsListOutcome(listOfApis, list)
  }
}
