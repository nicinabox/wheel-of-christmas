const proxy = require('express-http-proxy')

const WHEEL_API_URL = process.env.WHEEL_API_URL

module.exports = function(app) {
  app.use('/api', proxy(WHEEL_API_URL))
}
