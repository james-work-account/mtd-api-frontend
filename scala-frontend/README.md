# Scala Frontend

## Routes

| Route           | Description                              |
|-----------------|------------------------------------------|
| /               | Home route - select an API from here     |
| /:api           | API route - select an endpoint from here |
| /:api/:endopint | Endpoint route - Hit the APIs from here  |

## Headers

If present, the following headers will auto-fill parameters on the single endpoint page:

- nino
- vrn
- Accept
- ResponseBody (this fills in the output of a given request)