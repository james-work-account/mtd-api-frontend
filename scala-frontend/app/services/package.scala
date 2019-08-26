import models.{ApiListItem, Endpoint}
import org.jsoup.nodes.Document

package object services {

  type ApisOutcome = Seq[ApiListItem]

  case class EndpointsListOutcome(apis: ApisOutcome, endpoints: Seq[ApiListItem])

  case class EndpointOutcome(apis: ApisOutcome, endpoints: Seq[ApiListItem], endpoint: Endpoint)

  // Pretending I have a proper database
  var apis: Option[Seq[ApiListItem]] = None
  var endpointsList: Map[String, Seq[ApiListItem]] = Map()
  var apiPages: Map[String, Document] = Map()
  var detailedEndpointsList: Map[String, Endpoint] = Map()
}
