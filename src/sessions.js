'use strict';

const config = require('./config')
const db = require('./db')
const jwt = require('koa-jwt')
const bcrypt = require('co-bcrypt')
const md5 = require('md5')

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
  //  - change to live in the cookie?
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

// TODO: finish
// Create an encrypted string for a set of data
// - md5 email?
//
// {
//   id: userId,
//   email: email,
//   mask: hashofpassword
// }
function* authenticate(data, next) {
  console.log("HEREddd")
  // TODO: Setup verificaiton
  // apply this immediately
  let salt = yield bcrypt.genSalt(config.SALT_AMOUNT)
  let hash = yield bcrypt.hash(data.mask, salt)
  let emMd5 = md5(data.email)

  // setup the sql to store the
  let sql = `
    INSERT INTO masks (user_id, email, mask)
      VALUES (${data.id}, '${emMd5}', '${hash}')
      ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email, mask = EXCLUDED.mask;
  `;

  // Store the encrypted string into db?
  // wait until the query is done
  // TODO: Return validated token and user object
  return yield* db.query(sql)
  // yield* next
}

module.exports = {
  handler,
  authorize,
  authenticate
}
