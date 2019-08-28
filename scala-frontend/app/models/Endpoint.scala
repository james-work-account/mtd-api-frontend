package models

import play.api.libs.json.{JsValue, Json, Reads}

case class Endpoint(baseUrl: String, api_friendly_name: String, name: String, endpoint_name: String, http_verb: String, path: Option[String], path_params: Seq[(String, String)], query_params: Seq[(String, String)], request_headers: Seq[(String, String)], gov_test_scenarios: Seq[String], exampleBody: Option[JsValue])

object Endpoint {
  implicit val reads: Reads[Endpoint] = Json.reads[Endpoint]
}