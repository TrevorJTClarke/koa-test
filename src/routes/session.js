'use strict';

const Routes = require('koa-router');
const db = require('../db');
const router = new Routes();

// TODO:
// POST - create new authentication & session
router.post('/register', function*() {
  // let res = yield db.querySqlFile('get_tables_list')
  // this.body = res.rows
})

// TODO: 
// POST - setup new session
router.post('/session', function*() {
  // let res = yield db.querySqlFile('get_tables_list')
  // this.body = res.rows
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
