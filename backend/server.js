const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')
const generate = require('./server_functions/generate')
const send = require('./server_functions/send')
const apiInfo = require('./server_functions/apiInfo')
// hit RAML
const raml = require("raml-parser")

const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

const staticFileMiddleware = express.static(__dirname.substring(0, __dirname.length - 8) + '/dist') // remove "/backend" from __dirname
app.use(staticFileMiddleware)


/** GET API INFORMATION */
app.get('/apis', async (req, res) => {
  const response = await apiInfo.getAllApis()
  res.send(response)
})
app.get('/apis/:api', async (req, res) => {
  const {
    api
  } = req.params
  const response = await apiInfo.getEndpointNames(api)
  res.send(response)
})
app.get('/apis/:api/:endpoint', async (req, res) => {
  const response = await apiInfo.getEndpoint(req.params)
  res.send(response)
})


/** GENERATE OAUTH DATA */
app.get('/generate', async (req, res) => {
  const user = await generate.generateUser(req.query.userType)
  const {
    userId,
    password,
    mtdItId,
    nino,
    vrn
  } = user
  const oauthToken = await generate.grantAccess(userId, password)
  const accessToken = await generate.requestAccessToken(oauthToken)
  const response = {
    vrn,
    nino,
    mtdItId,
    accessToken
  }
  res.send(response)
})


/** HIT OUR APIS */
app.post('/send', async (req, res) => {
  const body = req.body;
  const queryParameters = req.query

  const url = send.getUrl(body, queryParameters)
  let headers = {
    "Authorization": body["Authorization"],
    "Accept": body["Accept"]
  }

  // Add Content-Type
  if (queryParameters.method === "POST") {
    headers["Content-Type"] = body["Content-Type"]
  }

  // Add Gov-Test-Scenario
  if (body["Gov-Test-Scenario"] && body["Gov-Test-Scenario"].length !== 0) {
    headers["Gov-Test-Scenario"] = body["Gov-Test-Scenario"]
  }

  let response = await send.getResponse(url, body, headers, queryParameters);
  res.send(response)
})

app.listen(process.env.PORT || 8080)
