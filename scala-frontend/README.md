# Scala Frontend

## Routes

| Method | Route           | Description                              |
|--------|-----------------|------------------------------------------|
| GET    | /               | Home route - select an API from here     |
| GET    | /:api           | API route - select an endpoint from here |
| GET    | /:api/:endpoint | Endpoint route - Hit the APIs from here  |

## Headers

If present, the following headers will auto-fill parameters on the single endpoint page (if not provided in headers, they will be auto-filled from the default values on the Developer Hub where available). These headers will be automatically populated when the Generate OAuth Data button is used.

- nino
- vrn
- Accept