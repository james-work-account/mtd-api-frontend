const axios = require('axios')

const getResponse = async (method, body, headers) => {
  const url = body.url
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
    // thrown when trying to read a value which is undefined (sometimes happens when offline or if I've forgotten to properly catch any optional properties)
    // e.g. in the JSON let body = { "valueA": 123 }, trying to do x["valueB"] without catching it properly
    return {
      status: 500,
      data: {
        code: "INTERNAL_SERVER_ERROR",
        message: "There are a number of reasons this could occur. Please contact a developer for more information."
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
  getResponse
}
