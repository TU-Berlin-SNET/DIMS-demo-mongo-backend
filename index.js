'use strict'

const config = require('./config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const authmiddleware = require('./auth-middleware')
const routes = require('./routes')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(authmiddleware)
app.use('/', routes)

app.listen(config.APP_PORT, config.APP_HOST, (server) => console.log('demo backend running at %s:%s', config.APP_HOST, config.APP_PORT))
