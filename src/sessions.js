'use strict';

const config = require('./config')
const jwt = require('koa-jwt')

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

  // TODO: finish
  // validate jwt token
  let ctx = (_this.headers.authorization && _this.headers.authorization.search('Bearer ') > -1)? _this.headers.authorization.split(' ')[1] : null
  // jwt.verify(ctx)
  console.log("TODO: jwt.verify",ctx)

  if(error) {
    // Error handle
    _this.body = { type: 'Error', message: 'Invalid Headers' }
  } else {
    // Continue
    return yield next
  }
}

function *authorize(data) {
  let token = jwt.sign({ payload: data }, config.JWT, { expiresIn: '7d', })
  // Finish
  return { token }
}

module.exports = {
  handler,
  authorize
}
