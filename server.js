const proxy = require('express-http-proxy')
const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 9000
const WHEEL_API_URL = process.env.WHEEL_API_URL

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, 'static')))

app.use('/api', proxy(WHEEL_API_URL))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)
