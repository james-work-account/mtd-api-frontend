package models

import play.api.libs.json.{Json, OFormat}

case class FullUserDetails(vrn: String, nino: String, Authorization: String)

object FullUserDetails {
  implicit val format: OFormat[FullUserDetails] = Json.format[FullUserDetails]
}