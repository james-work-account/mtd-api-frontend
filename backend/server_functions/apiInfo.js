const axios = require('axios')
const jsdom = require("jsdom")
const _ = require("underscore")

const getAllApis = async () => {
  const page = await axios.get("https://developer.service.hmrc.gov.uk/api-documentation/docs/api")

  const document = new jsdom.JSDOM(page.data).window.document

  const allApis = Array.from(document.querySelectorAll("#content table td"))
    .filter(elem => elem.querySelector("a"))
    .filter(elem => elem.querySelector("a").href.includes("/service/"))
    .map(elem => elem.querySelector("a"))

  return allApis.map(elem => {
    const name = elem.href.replace(/\/.*\/docs\/api\/.*\/(.*)\/\d\.\d$/, "$1")
    const friendly_name = elem.innerHTML
    return {
      name,
      friendly_name
    }
  })
}

const getEndpointNames = async (api) => {
  const page = await axios.get(`https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/${api}`)
  const document = new jsdom.JSDOM(page.data).window.document

  const title = document.querySelector("#title").innerHTML.trim()

  const sections = document.querySelectorAll("div#section > div.section")
  const apis = Array.from(sections[sections.length - 1].querySelectorAll("div.endpoint_group > div > div > div.persist-area"))
    .map(elem => {
      const friendly_name = elem.querySelector("div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > span:nth-child(2)").innerHTML
      const selector = Array.from(elem.children)[1].id
      return {
        friendly_name,
        selector
      }
    })

  return {
    title,
    apis
  }
}

const getEndpoint = async ({
  api,
  endpoint
}) => {
  const page = await axios.get(`https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/${api}`)

  const document = new jsdom.JSDOM(page.data).window.document
  const baseUrl = Array.from(document.querySelectorAll("#section table tbody tr"))
    .filter(elem => {
      if (elem.querySelector("th span")) {
        return elem.querySelector("th span").innerHTML === "Sandbox base URL"
      } else {
        return false
      }
    })
    .map(elem => elem.querySelector("td").innerHTML)[0]

  const endpointSelector = document.querySelector(`#${endpoint}`)
  const splitEndpoint = endpoint.split("-")

  const accordionSelector = `${splitEndpoint.slice(0, -1).join("-")}_${splitEndpoint[splitEndpoint.length - 1]}_accordion`
  const accordion = document.querySelector(`[id*='${accordionSelector}']`)

  const endpoint_name = accordion.querySelector("div.persist-area > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > span:nth-child(2)").innerHTML

  const findPath = (parent) => {
    // if there's a chance of finding anything
    if (parent.querySelector("div > code")) {
      // if there's a bold section within the code block
      if (parent.querySelector("div > code > strong")) {
        return parent.querySelector("div > code").textContent
      } else {
        // if there's a previous sibling
        if (parent.previousElementSibling) {
          return findPath(parent.previousElementSibling)
        } else {
          return null
        }
      }
    } else return null
  }

  const path = findPath(accordion)

  const path_params = Array.from(endpointSelector.querySelectorAll(`#request-parameters_${endpoint} > table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(1)`))
    .map(elem => elem.innerHTML)

  const query_params = Array.from(endpointSelector.querySelectorAll(`#query-parameters_${endpoint} > table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(1)`))
    .map(elem => elem.innerHTML)

  const request_headers = Array.from(endpointSelector.querySelector("section#request-headers").querySelectorAll(`table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(1)`))
    .map(elem => elem.innerHTML)

  const gov_test_scenarios = request_headers.includes("Gov-Test-Scenario") ?
    Array.from(document.querySelector(`#sandbox-data_${endpoint} > table > tbody`).querySelectorAll("tr > td:nth-child(1)")).map(el => el.textContent) :
    null

  return {
    baseUrl,
    endpoint_name,
    path,
    path_params,
    query_params,
    request_headers,
    gov_test_scenarios
  }
}

module.exports = {
  getAllApis,
  getEndpointNames,
  getEndpoint
}
