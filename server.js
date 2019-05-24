const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')
const generate = require('./server_functions/generate')
const send = require('./server_functions/send')

const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get('/generate', async (req, res) => {
  const user = await generate.generateUser()
  const {
    userId,
    password,
    mtdItId,
    nino
  } = user
  const oauthToken = await generate.grantAccess(userId, password)
  const accessToken = await generate.requestAccessToken(oauthToken)
  const response = {
    nino,
    mtdItId,
    accessToken
  }
  res.send(response)
})

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

app.listen(process.env.PORT || 8081)
