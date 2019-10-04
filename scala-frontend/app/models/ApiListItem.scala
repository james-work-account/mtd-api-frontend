package models

import play.api.libs.json.{Json, Reads}

case class ApiListItem(name: String, friendly_name: String)

object ApiListItem {
  implicit val reads: Reads[ApiListItem] = Json.reads[ApiListItem]
}
