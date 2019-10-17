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
    dateofbirth: {
      type: Date,
      required: true
    },
    birthname: {
      type: String
    },
    placeofbirth: {
      type: String
    },
    address: {
      type: String
    },
    gender: {
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

const model = Mongoose.model('NaturalPerson', schema)

module.exports = { schema, model }
