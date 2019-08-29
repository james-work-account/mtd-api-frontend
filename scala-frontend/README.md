# Scala Frontend

## Routes

| Method | Route               | Description                                                                                        |
|--------|---------------------|----------------------------------------------------------------------------------------------------|
| GET    | /                   | Home route - select an API from here                                                               |
| GET    | /:api               | API route - select an endpoint from here                                                           |
| GET    | /:api/:endpoint     | Endpoint route - View the individual endpoints from here                                           |
| POST   | /send               | Endpoint route - Actually hit the APIs                                                             |
| GET    | /generate           | Generate OAuth route - will redirect to referer if exists, otherwise will pretty print OAuth data |
