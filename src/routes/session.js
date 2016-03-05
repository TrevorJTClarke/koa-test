'use strict';

const body = require('co-body')
const Routes = require('koa-router')
const db = require('../db')
const sessions = require('../sessions')
const router = new Routes()

// TODO:
// POST - create new authentication & session
router.post('/register', function*() {
  console.log("HERE!sdsds")
  let data = yield body(this, { limit: '1kb' })
  console.log("register data",data)
  let test = yield sessions.authenticate(data)
  console.log("HERE!", test)
  // let res = yield db.querySqlFile('get_tables_list')
  // this.body = res.rows
})

// TODO: finish
// POST - login as new session
router.post('/session', function*() {
  let data = yield body(this, { limit: '1kb' })
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
