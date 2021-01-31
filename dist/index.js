
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-three-editable.cjs.production.min.js')
} else {
  module.exports = require('./react-three-editable.cjs.development.js')
}
