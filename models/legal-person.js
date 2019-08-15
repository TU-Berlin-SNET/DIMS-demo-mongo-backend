'use strict'

const Mongoose = require('../db')

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
      index: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
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
    }
  },
  { timestamps: true, minimize: false }
)

schema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret, options) => {
    delete ret._id
  }
})

module.exports = Mongoose.model('LegalPerson', schema)
