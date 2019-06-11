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
yarn run serve -- --port <PORT> (PORT can't be the default Vue port of 8080 since the backend runs on that port)
```

#### Backend
```
node server.js
OR
nodemon server.js (for hot reloading)
```

---

## Adding new APIs

#### Add under the relevant section in `src/data.js`

- Must be in the format:

```
"NAME": {
  "header-url": "URL",
  "method": "METHOD",
  "grouping": "GROUPING",
  "headers": ["HEADERS"],
  "scenarios": ["SCENARIOS"]
}
```

- Example (under "self-assessment"):

```
"Trigger a tax calculation v1.0": {
  "header-url": "/{nino}/calculations",
  "method": "POST",
  "grouping": "TaxCalc",
  "headers": [
    "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
  ],
  "scenarios": [
    "AGENT_NOT_SUBSCRIBED", "AGENT_NOT_AUTHORIZED", "CLIENT_NOT_SUBSCRIBED"
  ]
}
```

#### Be aware
  - `scenarios` is only necessary if one of the headers is Gov-Test-Scenario
  - Variables will be automatically pulled out of the `header-url` if you wrap the variable in curly braces (`{}`)
  - A Body will automatically be made available if the method is `POST` or `PUT`
  - If the `grouping` doesn't exist, make sure you make the NavBar entry look pretty with some nice CSS in `src/components/NavBar.vue`

---

## Note

Needs UI redesign as currently pretty ugly.
