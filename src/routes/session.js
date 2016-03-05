'use strict';

const Routes = require('koa-router')
const db = require('../db')
const sessions = require('../sessions')
const router = new Routes()

// TODO:
// POST - create new authentication & session
router.post('/register', function*() {
  let data = this.request.body
  console.log(data)
  // Validate
  this.validateBody('email')
    .optional()
    .isString()
    .trim()
    .isEmail('Invalid email format');
  this.validateBody('mask')
    .required('Invalid creds')
    .isString()
    .isLength(6, 100, 'Password must be 6-100 chars');

  let test = yield sessions.authenticate(data)
  console.log("HERE!", test)
  // let res = yield db.querySqlFile('get_tables_list')
  // this.body = res.rows
})

// TODO: finish
// POST - login as new session
router.post('/session', function*() {
  let data = this.request.body
  // let data = yield parse(this, { limit: '1kb' })
  // todo: validate and store
  this.body = yield* sessions.authorize(data)
})

// TODO:
// DELETE - logout
router.delete('/session', function*() {
  // let res = yield db.querySqlFile('get_tables_list')
  // this.body = res.rows
})

// TODO:
// GET - is valid session
router.get('/session', function*() {
  // let res = yield db.querySqlFile('get_tables_list')
  // this.body = res.rows
})

module.exports = router;
