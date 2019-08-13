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
/send?method={METHOD}

{
  url (full, with all query parameters)
  headers {
    k: v (for each header)
  }
  body (if method is POST or PUT)
}
```

#### Response

See [The Developer Hub](https://developer.service.hmrc.gov.uk/api-documentation/docs/api) for the correct expected body for your request.

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

Remember: put API names in comma-separated list under the Header `apis` (no spaces).

e.g. Headers: `apis -> api-example-microservice,agent-authorisation-api,business-rates-api,secure-data-exchange-bulk-download,customs-inventory-linking-exports,api-notification-pull,api-platform-test-user,estate-registration-api,agent-authorisation-api,individual-losses-api,self-assessment-api,api-platform-test-user,lisa-api,api-platform-test-user,national-insurance,api-platform-test-user,national-insurance-des-stub,individuals-paye,marriage-allowance,api-platform-test-user,paye-des-stub,marriage-allowance-des-stub,ras-api,individual-benefits,individual-employment,individual-income,individuals-paye,individual-tax,marriage-allowance,national-insurance,api-platform-test-user,paye-des-stub,marriage-allowance-des-stub,national-insurance-des-stub,trust-registration-api,vat-api,api-platform-test-user`

Less quick than `/apis`. Currently unused as when called from the frontend it was taking too long and if one API call fails, the entire thing fails.

```
{
  :api {
    baseUrl
    friendly_name
    :name {
      {
        name
        endpoint_name
        path
        path_params[string]
        query_params[string]
        request_headers[string]
        gov_test_scenarios[string]
      }
    }
  }
}
```

### /apis/api-info/:api

```
{
  baseUrl
  friendly_name
  endpoints {
    :name {
      endpoint_name
      http_verb
      path
      path_params[string]
      query_params[string]
      request_headers[string]
      gov_test_scenarios[string]
    }
  }
}
```

---

## Note

Needs UI redesign as currently pretty ugly.
