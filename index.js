'use strict'

const config = require('./config')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const authMiddleware = require('./auth-middleware')
const routes = require('./routes')

const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(authMiddleware)
app.use(bodyParser.json())
app.use('/', routes)
app.use((req, res, next) => res.status(404).json({ message: 'nothing here' }))

app.listen(config.APP_PORT, config.APP_HOST, (server) => console.log('demo backend running at %s:%s', config.APP_HOST, config.APP_PORT))
