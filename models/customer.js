'use strict'

const Mongoose = require('../db')

const schema = new Mongoose.Schema(
  {
    id: {
      type: String,
      index: { unique: true },
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    did: {
      type: String
    },
    picture: {
      type: String
    },
    meta: {}
  },
  { timestamps: true, minimize: false }
)

schema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret, options) => {
    delete ret._id
  }
})

const model = Mongoose.model('Customer', schema)

module.exports = { schema, model }
