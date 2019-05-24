const data = require('../src/data')
const axios = require('axios')

const baseURL = "https://test-api.service.hmrc.gov.uk/self-assessment/ni"

const getUrl = (body, queryParameters) => {
  const requestUrl = data[queryParameters.request]["header-url"]
  let url = baseURL + requestUrl;
  for (key in body) {
    url = url.replace(`{${key}}`, body[key])
  }
  return url
}

const getResponse = async (url, body, headers, {
  method
}) => {
  try {
    if (method === "POST") {
      await axios.post(url, JSON.parse(body["Body"]), {
          headers
        })
        .then(resp => {
          return {
            status: resp.status,
            data: resp.data
          }
        })
        .catch(error => {
          return {
            status: error.response.status,
            data: error.response.data
          }
        })
    } else if (method === "PUT") {
      await axios.put(url, JSON.parse(body["Body"]), {
          headers
        })
        .then(resp => {
          return {
            status: resp.status,
            data: resp.data
          }
        })
        .catch(error => {
          return {
            status: error.response.status,
            data: error.response.data
          }
        })
    } else if (method === "GET") {
      await axios.get(url, {
          'headers': headers
        })
        .then(resp => {
          return {
            status: resp.status,
            data: resp.data
          }
        })
        .catch(error => {
          return {
            status: error.response.status,
            data: error.response.data
          }
        })
    }
  } catch (error) {
    return getError(error)
  }
}

const getError = (error) => {
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
        message: "Probably offline lol"
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