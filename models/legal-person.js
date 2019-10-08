'use strict'

const Mongoose = require('../db')

// Legal Person
// LegalPersonIdentifier Uniqueness Identifier mandatory
// LegalName Legal Name mandatory
// LegalAddress Legal Address optional
// VATRegistration VAT Registration Number optional
// TaxReference Tax Reference Number optional
// LEI Legal Entity Identifier optional
// EORI Economic Operator Registration and Identification optional
// SEED System for Exchange of Excise Data Identifier optional
// SIC Standard Industrial Classification

const schema = new Mongoose.Schema(
  {
    id: {
      type: String,
      index: { unique: true },
      required: true
    },
    legalName: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    vatRegistration: {
      type: Number
    },
    taxReference: {
      type: Number
    },
    lei: {
      type: String
    },
    eori: {
      type: String
    },
    seed: {
      type: String
    },
    sic: {
      type: String
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

const model = Mongoose.model('LegalPerson', schema)

module.exports = { schema, model }
