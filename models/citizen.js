'use strict'

const Mongoose = require('../db')

// Natural Person
// PersonIdentitfier Uniqueness Identifier mandatory
// FamilyName Current Family Name(s) mandatory
// FirstName Current First Name(s) mandatory
// DateOfBirth Date of Birth mandatory
// BirthName First name(s) and family name(s) at birth optional
// PlaceOfBirth Place of Birth optional
// CurrentAddress Current Address optional
// Gender Gender optional

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
    legalId: {
      type: String,
      index: { unique: true },
      required: true
    },
    familyName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    legalName: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    placeOfBirth: {
      type: String
    },
    gender: {
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

const model = Mongoose.model('Citizen', schema)

module.exports = { schema, model }
