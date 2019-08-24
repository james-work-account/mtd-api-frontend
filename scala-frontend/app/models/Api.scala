package models

import play.api.libs.json.{Json, Reads}

case class Api(baseUrl: String, friendly_name: String, endpoints: Seq[Endpoint])

object Api {
  implicit val reads: Reads[Api] = Json.reads[Api]
}