# Scala Frontend

## Routes

| Method | Route               | Description                                                                                        |
|--------|---------------------|----------------------------------------------------------------------------------------------------|
| GET    | /                   | Home route - select an API from here                                                               |
| GET    | /:api               | API route - select an endpoint from here                                                           |
| GET    | /:api/:endpoint     | Endpoint route - View the individual endpoints from here                                           |
| POST   | /send               | Endpoint route - Actually hit the APIs                                                             |
| GET    | /generate           | Generate OAuth route - will redirect to referrer if exists, otherwise will pretty print OAuth data |

## TODO - Headers

If present, the following headers will auto-fill parameters on the single endpoint page (if not provided in headers, they will be auto-filled from the default values on the Developer Hub where available). These headers will be automatically populated when the Generate OAuth Data button is used.

- nino
- vrn
- Accept