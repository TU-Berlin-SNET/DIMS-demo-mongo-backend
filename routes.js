'use strict'

const express = require('express')
const baseRoute = express.Router()

const routes = [
  {
    name: 'legal-person',
    model: require('./models/legal-person')
  },
  {
    name: 'natural-person',
    model: require('./models/natural-person')
  }
]

function registerRoute (route, baseRouter) {
  const router = express.Router()
  const path = route.name + 's'
  const Model = route.model
  const idParam = route.name.split('-').join('') + 'Id'

  router.route(`/`)
    .get(async (req, res) => {
      try {
        const data = Model.find(req.query || {}).exec()
        res.json(data || [])
      } catch (err) {
        res.status(500).send(err)
      }
    })
    .post(async (req, res) => {
      try {
        const data = await new Model(req.body).save()
        res.json(data)
      } catch (err) {
        res.status(err.name === 'ValidationError' ? 400 : 500).send(err)
      }
    })

  router.route(`/:${idParam}`)
    .get(async (req, res) => {
      try {
        const data = await Model.findOne({ id: req.params[idParam] }).exec()
        if (!data) {
          res.status(404).send({ message: 'not found' })
        } else {
          res.json(data)
        }
      } catch (err) {
        res.status(500).send(err)
      }
    })
    .put(async (req, res) => {
      try {
        const data = await Model.findOneAndUpdate({ id: req.params[idParam] }, req.body, { upsert: true }).exec()
        if (!data) {
          res.send(404)
        } else {
          res.json(data)
        }
      } catch (err) {
        res.status(500).send(err)
      }
    })
    .delete(async (req, res) => {
      try {
        await Model.findOneAndDelete({ id: req.params[idParam] }).exec()
        res.send(204)
      } catch (err) {
        res.status(500).send(err)
      }
    })

  baseRouter.use(`/${path}`, router)
  console.log('registered route %s', path)
}

routes.forEach(route => registerRoute(route, baseRoute))

module.exports = baseRoute
