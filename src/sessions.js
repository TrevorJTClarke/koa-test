'use strict';

const config = require('./config')

/**
 * sessionHandler
 *
 * Checks for a valid session, looks for all required headers
 */
function *handler(next) {
  let _this = this
  let error = false

  // check all headers against config headers
  for (let h in config.headers) {
    // compare direct header strings
    if(!_this.headers[h] || _this.headers[h] !== config.headers[h]) {
       error = true
    }
  }

  // TODO:
  // validate token authentication

  if(error) {
    // Error handle
    _this.body = { type: 'Error', message: 'Invalid Headers' }
  } else {
    // Continue
    return yield next
  }
}

module.exports = { handler }
