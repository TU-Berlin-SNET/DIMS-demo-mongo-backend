'use strict'
const config = require('./config')
const Passport = require('passport')
const PassportJwt = require('passport-jwt')
const JwtStrategy = PassportJwt.Strategy
const ExtractJwt = PassportJwt.ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
}

Passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
  done(null, { user: payload.id })
}))

module.exports = Passport.authenticate('jwt', { session: false })
