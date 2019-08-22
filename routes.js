'use strict'

const express = require('express')
const baseRoute = express.Router()

const routes = [
  {
    name: 'citizen',
    model: require('./models/citizen')
  }
]

async function process(req, res, dataFn) {
  try {
    const data = await dataFn()
    if (!data) {
      return res.status(404).json({ message: 'not found' })
    }
    if (req.method === 'DELETE') {
      return res.status(204).end()
    }
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(err.name === 'ValidationError' ? 400 : 500).send(err.message)
  }
}

function registerRoute (route, baseRouter) {
  const router = express.Router()
  const path = route.name + 's'
  const Model = route.model
  const idParam = route.name.split('-').join('') + 'Id'

  router.route(`/`)
    .get(async (req, res) => await process(req, res,
      () => Model.find(req.query || {}).exec()))
    .post(async (req, res) => await process(req, res,
      () => new Model(req.body).save()))

  router.route(`/:${idParam}`)
    .get(async (req, res) => await process(req, res,
      () => Model.findOne({ id: req.params[idParam] }).exec()))
    .put(async (req, res) => await process(req, res,
      () => Model.findOneAndUpdate({ id: req.params[idParam] }, req.body, { upsert: true, new: true }).exec()))
    .delete(async (req, res) => await process(req, res,
      () => Model.findOneAndDelete({ id: req.params[idParam] }).exec()))

  baseRouter.use(`/${path}`, router)
  console.log('registered route %s', path)
}

routes.forEach(route => registerRoute(route, baseRoute))

module.exports = baseRoute
