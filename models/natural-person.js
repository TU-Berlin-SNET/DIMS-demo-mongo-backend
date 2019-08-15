'use strict'

const Mongoose = require('../db')

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
      index: true,
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
    dateOfBirth: {
      type: Date,
      required: true
    },
    placeOfBirth: {
      type: String
    },
    address: {
      type: String
    },
    gender: {
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

module.exports = Mongoose.model('NaturalPerson', schema)
