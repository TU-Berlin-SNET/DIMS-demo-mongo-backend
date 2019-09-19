'use strict'

const Mongoose = require('../db')

const schema = new Mongoose.Schema(
  {
    id: {
      type: String,
      index: { unique: true },
      required: true
    },
    name: {
      type: String,
      required: true
    },
    bank: {
      type: String,
      required: true
    },
    month1: {
      date: {
        type: Date
      },
      income: {
        type: Number
      },
      balance: {
        type: Number
      }
    },
    month2: {
      date: {
        type: Date
      },
      income: {
        type: Number
      },
      balance: {
        type: Number
      }
    },
    month3: {
      date: {
        type: Date
      },
      income: {
        type: Number
      },
      balance: {
        type: Number
      }
    },
    meta: { }
  },
  { timestamps: true, minimize: false }
)

schema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret, options) => {
    delete ret._id
  }
})

const model = Mongoose.model('BankCustomer', schema)

module.exports = { schema, model }
