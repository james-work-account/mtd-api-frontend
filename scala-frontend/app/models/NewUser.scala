package models

import play.api.libs.json.{Json, Reads}

case class NewUser(userId: String, password: String, mtdItId: String, nino: String, vrn: String)

object NewUser {
  implicit val reads: Reads[NewUser] = Json.reads[NewUser]
}
