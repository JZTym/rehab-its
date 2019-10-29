const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// BodyParser middleware
app.use(bodyParser.json())

module.exports = app
