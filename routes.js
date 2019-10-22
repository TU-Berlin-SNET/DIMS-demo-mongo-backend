'use strict'

const express = require('express')
const baseRoute = express.Router()

const routes = [
  {
    name: 'citizen',
    model: require('./models/citizen'),
    roles: []
  },
  {
    name: 'bank-customer',
    model: require('./models/bank-customer'),
    roles: ['bank']
  },
  {
    name: 'legal-person',
    model: require('./models/legal-person'),
    roles: ['government']
  },
  {
    name: 'natural-person',
    model: require('./models/natural-person'),
    roles: ['government', 'shop']
  }
]
routes.forEach(route => { route.schema = reduceSchemaObjToJson(route.model.schema.obj) })

function reduceSchemaObjToJson (schema) {
  return Object.entries(schema).reduce((accu, entry) => {
    const [key, value] = entry
    switch (typeof value) {
      case 'function':
        accu[key] = value.name
        break
      case 'object':
        accu[key] = reduceSchemaObjToJson(value)
        break
      default:
        accu[key] = value
    }
    return accu
  }, {})
}

function reduceToSchemas (data, filter) {
  const processData = filter ? data.filter(filter) : data
  return processData.reduce((accu, value) => {
    accu[value.name + 's'] = value.schema
    return accu
  }, {})
}

async function process (req, res, dataFn) {
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
    res.status(err.name === 'ValidationError' ? 400 : 500).json({ message: err.message })
  }
}

function registerRoute (route, baseRouter) {
  const router = express.Router()
  const path = route.name + 's'
  const Model = route.model.model
  const idParam = route.name.split('-').join('') + 'Id'

  router.route(`/`)
    .get(async (req, res) => process(req, res,
      () => Model.find(req.query || {}).exec()))
    .post(async (req, res) => process(req, res,
      () => new Model(req.body).save()))

  router.route(`/:${idParam}`)
    .get(async (req, res) => process(req, res,
      () => Model.findOne({ id: req.params[idParam] }).exec()))
    .put(async (req, res) => process(req, res,
      () => Model.findOneAndUpdate({ id: req.params[idParam] }, req.body, { new: true }).exec()))
    .delete(async (req, res) => process(req, res,
      () => Model.findOneAndDelete({ id: req.params[idParam] }).exec()))

  baseRouter.use(`/${path}`, router)
  console.log('registered route %s', path)
}

routes.forEach(route => registerRoute(route, baseRoute))

baseRoute.get('/models', (req, res) => {
  res.json(reduceToSchemas(routes))
})

baseRoute.get('/models/:role', (req, res) => {
  res.json(reduceToSchemas(routes, v => v.roles.includes(req.params.role)))
})

module.exports = baseRoute
