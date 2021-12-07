const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const { join } = require('path')

const app = express()

const port = process.env.SERVER_PORT || 3000

var cors = require('cors')

app.use(cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(morgan('dev'))
app.use(helmet())
app.use(express.static(join(__dirname, 'build')))

app.listen(port, () => console.log(`Server listening on port ${port}`))
