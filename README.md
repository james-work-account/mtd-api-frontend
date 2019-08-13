# mtd-api-frontend

## Run with Docker
```
docker rmi jamesworkaccount/express-app (if pulled down already)
docker run -p 8080:8080 jamesworkaccount/express-app
```

---

## Run locally

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development

#### Frontend

```
yarn run frontend (frontend runs on port 8081)
OR
yarn run serve -- --port <PORT> (PORT can't be the default Vue port of 8080 since the backend runs on that port)
```

#### Backend
```
yarn run backend
OR
node server.js (if you don't have nodemon installed)
```

---

## Data Structures

### /generate

NOTE: Will only generate currently for APIs using the read/write vat & self-assessment scopes. Contact a developer or add your scope to backend/server_functions/generate.js to make this work with your API.

```
{
  vrn
  nino
  mtdItId
  accessToken
}
```

### /send

#### Request

```
/send?method={METHOD}&url={URL} (URL includes any query parameters)

{
  url
  headers {
    k: v (for each header)
  }
  body (if method is POST or PUT)
}
```

#### Response

See https://developer.service.hmrc.gov.uk/api-documentation/docs/api for the correct expected body for your request.

### /apis

```
[
  {
    name
    friendly_name
  }
]
```

### /apis/api-info

Remember: put API names in comma-separated list under the Header `apis` (no spaces)
Less quick than `/apis`. Need to work out what should actually go here.

```
[
  arr [
    {
      :name {
        baseUrl
        arr [
          {
            name
            endpoint_name
            path
            path_params[string]
            query_params[string]
            request_headers[string]
            gov_test_scenarios[string]
          }
        ]
      }
    }
  ]
]
```

### /apis/api-info/:api

```
{
  baseUrl
  arr [
    {
      name
      endpoint_name
      http_verb
      path
      path_params[string]
      query_params[string]
      request_headers[string]
      gov_test_scenarios[string]
    }
  ]
}
```

---

## Note

Needs UI redesign as currently pretty ugly.
