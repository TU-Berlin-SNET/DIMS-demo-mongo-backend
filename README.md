# Demo MongoDB Backend

A mongodb backend connector with rest-api and some added functionality, for demo purposes only.

## How to use

```shell
# Create the image
docker-compose build demobackend

# Run a full set including pool, api, schemacompiler, mongodb, demobackend
# Demobackend reachable at localhost:8011 or 172.16.0.110:8011
docker-compose -f docker-compose.all.yaml up

# Or: Run only demobackend and mongodb at localhost
docker-compose up
```

Authentication is provided by the API. Register and login there. The provided token can be used for the demobackend. `IDC_API_JWT_SECRET` must be the same for both `api` and `demobackend`.

### Configuration

Use `.env` (or environment variables), valid attributes are:
```shell
DEMO_BACKEND_HOST
# default: 8011
DEMO_BACKEND_PORT

# should be the same as for the api
IDC_API_JWT_SECRET

# default: debug
DEMO_BACKEND_LOG_LEVEL

# default: mongodb
IDC_API_DB_HOST
# default: 27017
IDC_API_DB_PORT
IDC_API_DB_USER
IDC_API_DB_PASSWORD
```


## Collections

### citizens

#### Paths
| Path            | Methods |
|:----------------|---------|
| /citizens  | GET, POST |
| /citizens/:id | GET, PUT, DELETE |

__NOTE__: `GET /citizens` also supports query parameters (exact match) for every field in the model, e.g. `GET /citizens?familyName=Digital`

#### Model

```jsonc
{
    // required, unique
    "id": "string",
    "legalId": "string",

    // required
    "familyName": "string",
    "firstName": "string",
    "legalName": "string",
    "address": "string",
    "dateOfBirth": "date",

    // optional
    "placeOfBirth": "string",
    "gender": "string",
    "vatRegistration": 10,
    "taxReference": 20,
    "lei": "string",
    "eori": "string",
    "seed": "string",
    "sic": "string",
    "did": "string",

    // automatically handled
    "createdAt": "date",
    "updatedAt": "date"
}
```
