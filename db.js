/**
 * Mongoose Initialization and initial connection establishment
 */
'use strict'

const config = require('./config')
const Mongoose = require('mongoose')

const connRetriesLimit = 3
const connRetriesInterval = 3000

let connString = 'mongodb://'
let connRetries = 0

Mongoose.Promise = global.Promise

if (config.DB_USER) {
  connString += `${config.DB_USER}:${config.DB_PASSWORD}@`
}
connString += `${config.DB_HOST}:${config.DB_PORT}/idchain`

/**
 * Connect to MongoDB
 */
function connect () {
  Mongoose.connect(connString)
    .then(() => console.log('connection to database established'))
    .catch(error => {
      console.error(error)
      if (connRetries < connRetriesLimit) {
        connRetries++
        console.log(
          `Retrying to connect to MongoDB in ${connRetriesInterval}ms` +
                        `- [${connRetries}/${connRetriesLimit}]`
        )
        setTimeout(connect, connRetriesInterval)
      } else {
        process.exit(1)
      }
    })
}
connect()

module.exports = Mongoose
