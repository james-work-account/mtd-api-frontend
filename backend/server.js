const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')
const generate = require('./server_functions/generate')
const send = require('./server_functions/send')
const apiInfo = require('./server_functions/apiInfo')

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

app.get('/apis/api-info', async (req, res) => {
  const apis = req.header("apis").split(",")
  const response = await apiInfo.getEndpointNames(apis)
  res.send(response)
})

app.get('/apis/api-info/:api', async (req, res) => {
  const response = await apiInfo.getEndpointsFor(req.params)
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
  const {
    method
  } = req.query

  let headers = {}

  // Some APIs require no Authorization header (according to docs)
  if (body["Authorization"]) {
    headers["Authorization"] = body["Authorization"]
  }

  // In case Accept header isn't specified in docs
  if (body["Accept"]) {
    headers["Accept"] = body["Accept"]
  }

  // Add Content-Type
  if (method === "POST" || method === "PUT") {
    headers["Content-Type"] = body["Content-Type"]
  }

  // Add Gov-Test-Scenario
  if (body["Gov-Test-Scenario"] && body["Gov-Test-Scenario"].length !== 0) {
    headers["Gov-Test-Scenario"] = body["Gov-Test-Scenario"]
  }

  let response = await send.getResponse(method, body, headers);
  res.send(response)
})

app.listen(process.env.PORT || 8080)
