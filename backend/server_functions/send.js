const data = require('../../src/data/data')
const axios = require('axios')

const baseURL = (apiGrouping) => {
  switch (apiGrouping) {
    case "self-assessment-api":
      return "https://test-api.service.hmrc.gov.uk/self-assessment/ni"
    case "vat":
      return "https://test-api.service.hmrc.gov.uk/organisations/vat"
    case "losses":
      return "https://test-api.service.hmrc.gov.uk/individual/losses"
    default:
      return "um no"
  }

}

const getUrl = (body, {
  request,
  apiGrouping
}) => {
  const requestUrl = data[apiGrouping][request]["header-url"]
  let url = baseURL(apiGrouping) + requestUrl;
  for (key in body) {
    if (body[key].length !== 0) {
      url = url.replace(`{${key}}`, body[key])
    } else {
      url = url.replace(`${key}={${key}}`, body[key])
    }
  }
  url = url.replace(/\w+={\w+}/g, "") // remove any extra where value is unchanged after previous replaces
  return url
}

const getResponse = async (url, body, headers, {
  method
}) => {
  try {
    if (method === "POST") {
      return await axios.post(url, JSON.parse(body["Body"]), {
          headers
        })
        .then(resp => {
          return getSuccess(resp)
        })
        .catch(error => {
          return getError(error)
        })
    } else if (method === "PUT") {
      return await axios.put(url, JSON.parse(body["Body"]), {
          headers
        })
        .then(resp => {
          return getSuccess(resp)
        })
        .catch(error => {
          return getError(error)
        })
    } else if (method === "GET") {
      return await axios.get(url, {
          headers
        })
        .then(resp => {
          return getSuccess(resp)
        })
        .catch(error => {
          return getError(error)
        })
    } else if (method === "DELETE") {
      return await axios.delete(url, {
          headers
        })
        .then(resp => {
          return getSuccess(resp)
        })
        .catch(error => {
          return getError(error)
        })
    }
  } catch (error) {
    return getFallbackError(error)
  }
}

const getSuccess = (resp) => {
  return {
    status: resp.status,
    data: resp.data
  }
}

const getError = (error) => {
  return {
    status: error.response.status,
    data: error.response.data
  }
}


const getFallbackError = (error) => {
  if (error.name === "SyntaxError") {
    // malformed JSON - JSON.parse has failed
    return {
      status: 400,
      data: {
        code: "MALFORMED_JSON_ERROR",
        message: "Enter a valid JSON body"
      }
    }
  } else if (error.name === "TypeError" && error.message === "Cannot read property 'status' of undefined") {
    // probably offline - thrown when resp or error.response doesn't have a status
    return {
      status: 500,
      data: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Probably offline lol (or you've been fiddling with code you don't understand)"
      }
    }
  } else {
    console.log(error)
    return {
      status: 500,
      data: {
        code: "INTERNAL_SERVER_ERROR",
        message: "¯\_(ツ)_/¯"
      }
    }
  }
}

module.exports = {
  getUrl,
  getResponse
}