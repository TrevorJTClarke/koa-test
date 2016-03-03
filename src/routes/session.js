'use strict';

const Routes = require('koa-router');
const db = require('../db');
const router = new Routes();

// TODO: return all the table names inside the DB
router.get('/session', function*() {
  // let res = yield db.querySqlFile('get_tables_list')
  // this.body = res.rows
})


module.exports = router;
