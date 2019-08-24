import models.ApiListItem
import org.jsoup.nodes.Document
import play.api.libs.json.{JsObject, Json}

package object services {

  type ApisOutcome = Seq[ApiListItem]

  case class EndpointsListOutcome(apis: ApisOutcome, endpoints: Seq[ApiListItem])

  // Pretending I have a proper database
  var apis: Option[Seq[ApiListItem]] = None
  var endpointsList: Map[String, Seq[ApiListItem]] = Map()
  var apiPages: Map[String, Document] = Map()
}
