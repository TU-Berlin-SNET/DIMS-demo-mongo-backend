'use strict'

require('dotenv').config()
const crypto = require('crypto')

exports.APP_HOST = process.env.DEMO_BACKEND_HOST || 'localhost'
exports.APP_PORT = process.env.DEMO_BACKEND_PORT || 8011

exports.JWT_SECRET = process.env.IDC_API_JWT_SECRET || crypto.randomFillSync(Buffer.alloc(32)).toString('base64')

exports.LOG_LEVEL = process.env.DEMO_BACKEND_LOG_LEVEL || 'debug'

exports.DB_HOST = process.env.IDC_API_DB_HOST || 'mongodb'
exports.DB_PORT = process.env.IDC_API_DB_PORT || '27017'
exports.DB_USER = process.env.IDC_API_DB_USER || ''
exports.DB_PASSWORD = process.env.IDC_API_DB_PASSWORD || ''
