package services

import com.google.inject.ImplementedBy
import connectors.DocumentationConnector
import javax.inject.Inject
import models.{ApiListItem, Endpoint}
import org.jsoup.nodes.{Document, Element}
import org.jsoup.select.{Elements, NodeFilter, NodeVisitor}
import play.api.Logger
import play.api.libs.json.{JsValue, Json}

import scala.annotation._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Failure, Success, Try}

@ImplementedBy(classOf[DocumentationServiceImpl])
trait DocumentationService {
  def apiList: Future[ApisOutcome]

  def endpointList(api: String): Future[EndpointsListOutcome]

  def endpoint(api: String, endpoint: String): Future[EndpointOutcome]
}

class DocumentationServiceImpl @Inject()(connector: DocumentationConnector) extends DocumentationService {
  override def apiList: Future[ApisOutcome] = {
    if (apis.isDefined) Future.successful(apis.get) else {
      for {
        doc: Document <- connector.getApiList
      } yield {
        val els = doc.select("#content td > a[href*=/service/]")
        val friendly_names = els.eachText().toArray.toSeq.map(_.toString)
        val names = els.eachAttr("href").toArray.toSeq.map(_.toString()).map(_.replaceAll("/.+/docs/api/service/(.*)/.+", "$1"))
        val list = (names zip friendly_names).map {
          case (n, fn) => ApiListItem(n, fn)
        }
        apis = Some(list)
        list
      }
    }
  }

  override def endpointList(api: String): Future[EndpointsListOutcome] = {
    val apiListFuture: Future[ApisOutcome] = if (apis.isDefined) Future.successful(apis.get) else apiList
    val endpointListFuture: Future[Seq[ApiListItem]] = if (endpointsList.get(api).isDefined) Future.successful(endpointsList(api)) else {
      Logger.logger.info(s"Getting information for [$api]")
      val document: Future[Document] = getFutureDocument(api)
      document.flatMap {
        doc =>
          Future(doc.select("#section .section div.endpoint_group > div > div > div.persist-area"))
            .map {
              els =>
                val friendly_names = els.select("div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > span:nth-child(2)").eachText().toArray.toSeq.map(_.toString())
                val names = els.select("div[id]").eachAttr("id").toArray.toSeq.map(_.toString())
                val l: Seq[ApiListItem] = (names zip friendly_names).map {
                  case (n, fn) => ApiListItem(n, fn)
                }
                endpointsList += (api -> l)
                l
            }
      }
    }

    for {
      listOfApis: Seq[ApiListItem] <- apiListFuture
      list: Seq[ApiListItem] <- endpointListFuture
    } yield {
      EndpointsListOutcome(listOfApis, list)
    }
  }

  override def endpoint(api: String, endpoint: String): Future[EndpointOutcome] = {
    val apiListFuture: Future[ApisOutcome] = if (apis.isDefined) Future.successful(apis.get) else apiList
    val endpointListFuture: Future[Seq[ApiListItem]] = if (endpointsList.get(api).isDefined) Future.successful(endpointsList(api)) else endpointList(api).map(_.endpoints)
    val endpointModelFuture: Future[Endpoint] = {
      if (detailedEndpointsList.get(endpoint).isDefined) Future.successful(detailedEndpointsList(endpoint)) else {

        val document: Future[Document] = getFutureDocument(api)
        val pathFuture: Elements => Future[Option[String]] = parent => Future(findPath(parent))

        for {
          doc <- document
          splitEndpoint = endpoint.split("-")
          accordionSelector = s"${splitEndpoint.init.mkString("-")}_${splitEndpoint.last}_accordion"
          accordion = doc.select(s"[id*='${accordionSelector}']")
          path <- pathFuture(accordion)
        } yield {
          val api_friendly_name: String = doc.title().split(" - ").headOption.getOrElse("")

          val baseUrl: String = doc.select("#section table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(2)").text()

          val endpointSelector = doc.getElementById(endpoint)

          val endpoint_name = accordion.select("div.persist-area > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > span:nth-child(2)").text()

          val path_params: Seq[(String, String)] = {
            // parameter
            val p: Seq[String] = endpointSelector.select(s"#request-parameters_${endpoint} > table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(1)").eachText().toArray.toSeq.map(_.toString)
            // example (good luck refactoring...)
            val e: Seq[String] = selectExample(endpointSelector, s"#request-parameters_${endpoint} > table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(2) > div:nth-child(1)")

            p zip e
          }

          val query_params: Seq[(String, String)] = {
            val p = endpointSelector.select(s"#query-parameters_${endpoint} > table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(1)").eachText().toArray.toSeq.map(_.toString)
            val e = selectExample(endpointSelector, s"#query-parameters_${endpoint} > table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(2) > div:nth-child(1) p")

            p zip e
          }
          val request_headers: Seq[(String, String)] = {
            val h = endpointSelector.select("section#request-headers").first() // Documentation has more than one element with the ID `request-headers` (against convention) so need to select only the fist one
              .select(" table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(1)").eachText().toArray.toSeq.map(_.toString)
            val e = endpointSelector.select("section#request-headers").first()
              .select(" table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(2)")
              .toArray.toSeq.map {
              x =>
                val el = x.asInstanceOf[Element]
                // The way that the Authorization header is placed in the documentation is inconsistent with the other headers
                // Therefore we need to find the header example in one of two ways
                if (!el.select("div:nth-child(1) code").isEmpty) el.select("div:nth-child(1) code").text() else {
                  el.select("code").eachText().toArray.toSeq.map(_.toString).find(_.contains("Bearer")).getOrElse("")
                }
            }
            h zip e
          }
          val gov_test_scenarios: Seq[String] = if (request_headers.map(_._1).contains("Gov-Test-Scenario")) {
            doc.select(s"#sandbox-data_${endpoint} > table > tbody tr > td:nth-child(1)").eachText().toArray.toSeq.map(_.toString)
          } else {
            Seq()
          }
          val http_verb = splitEndpoint.last.toUpperCase

          val exampleBody: Option[JsValue] = if (endpointSelector.select(s"section#sample-request_$endpoint").isEmpty) None else {
            val b = endpointSelector.select(s"section#sample-request_$endpoint > section > pre").first().text()
            Some(Json.parse(b))
          }

          val model = Endpoint(
            baseUrl = baseUrl,
            api_friendly_name = api_friendly_name,
            name = endpoint,
            endpoint_name = endpoint_name,
            http_verb = http_verb,
            path = path,
            path_params = path_params,
            query_params = query_params,
            request_headers = request_headers,
            gov_test_scenarios = gov_test_scenarios,
            exampleBody = exampleBody
          )

          detailedEndpointsList += (endpoint -> model)

          model

        }
      }
    }

    for {
      listOfApis: Seq[ApiListItem] <- apiListFuture
      listOfEndpoints: Seq[ApiListItem] <- endpointListFuture
      endpointModel <- endpointModelFuture
    } yield {
      EndpointOutcome(listOfApis, listOfEndpoints, endpointModel)
    }
  }


  private def selectExample(endpointSelector: Element, input: String): Seq[String] = endpointSelector
    .select(input)
    .toArray.toSeq.map(_.asInstanceOf[Element])
    .map(
      _.select("p")
        .eachText().toArray.toSeq.map(_.toString)
        .map(t => if (t.contains("For example")) t else "")
    ).map(_.filter(_.nonEmpty)).map(_.headOption.getOrElse("")).map(_.replaceAll("For example:", "").trim)

  private def getFutureDocument(api: String): Future[Document] = {
    val pageOption = (apiPages.get(api))
    val fd = (if (pageOption.isDefined) Future.successful(pageOption.get.asInstanceOf[Document]) else connector.getApiEndpoint(api))

    for {
      doc <- fd
    } yield {
      if (pageOption.isEmpty) apiPages += (api -> doc)
      doc
    }
  }

  @tailrec
  private def findPath(parent: Elements): Option[String] = {
    // if there's a chance of finding anything
    if (!parent.select("div > code").isEmpty) {
      // if there's a bold section within the code block
      if (!parent.select("div > code > strong").isEmpty) {
        Some(parent.select("div > code").first().text())
      } else {
        // if there's a previous sibling
        if (!parent.prev().isEmpty) {
          findPath(parent.prev())
        } else {
          None
        }
      }
    } else {
      None
    }
  }


}
