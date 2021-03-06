const axios = require('axios')
const jsdom = require("jsdom")

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

const getEndpointNames = async (apis) => {
  try {
    let obj = {};
    for (const api of apis) {
      const details = await getEndpointsFor({
        api
      })
      obj = {
        ...obj,
        [api]: details
      }
    }
    return obj
  } catch (error) {
    console.log(error)
    return {
      status: error.response.status,
      body: error.response.data
    }
  }
}

const getIndividualApiNames = async (api, document) => {
  console.log(`Fetching data for [${api}]`)

  const sections = document.querySelectorAll("div#section > div.section")
  return Array.from(sections[sections.length - 1].querySelectorAll("div.endpoint_group > div > div > div.persist-area"))
    .map(elem => {
      const friendly_name = elem.querySelector("div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > span:nth-child(2)").innerHTML
      const name = Array.from(elem.children)[1].id
      return {
        friendly_name,
        name
      }
    })
}

const getEndpointsFor = async ({
  api
}) => {
  const page = await axios.get(`https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/${api}`)

  const document = new jsdom.JSDOM(page.data).window.document

  const friendly_name = document.title.split(" - ")[0]

  const baseUrl = Array.from(document.querySelectorAll("#section table tbody tr"))
    .filter(elem => {
      if (elem.querySelector("th span")) {
        return elem.querySelector("th span").innerHTML === "Sandbox base URL"
      } else {
        return false
      }
    })
    .map(elem => elem.querySelector("td").innerHTML)[0]

  const endpointNames = await getIndividualApiNames(api, document)

  let endpoints = {}
  for (const {
      name
    } of endpointNames) {
    const endpointSelector = document.querySelector(`#${name}`)
    const splitEndpoint = name.split("-")

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

    const path_params = Array.from(endpointSelector.querySelectorAll(`#request-parameters_${name} > table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(1)`))
      .map(elem => elem.innerHTML)

    const query_params = Array.from(endpointSelector.querySelectorAll(`#query-parameters_${name} > table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(1)`))
      .map(elem => elem.innerHTML)

    const request_headers = Array.from(endpointSelector.querySelector("section#request-headers").querySelectorAll(`table:nth-child(2) > tbody:nth-child(3) > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(1)`))
      .map(elem => elem.innerHTML)

    const gov_test_scenarios = request_headers.includes("Gov-Test-Scenario") ?
      Array.from(document.querySelector(`#sandbox-data_${name} > table > tbody`).querySelectorAll("tr > td:nth-child(1)")).map(el => el.textContent) : []

    const http_verb = name.split("-")[name.split("-").length - 1].toUpperCase()

    const obj = {
      endpoint_name,
      http_verb,
      path,
      path_params,
      query_params,
      request_headers,
      gov_test_scenarios
    }

    endpoints = {
      ...endpoints,
      [name]: obj
    }
  }

  return {
    baseUrl,
    friendly_name,
    endpoints
  }
}

module.exports = {
  getAllApis,
  getEndpointNames,
  getEndpointsFor
}
