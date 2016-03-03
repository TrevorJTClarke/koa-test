'use strict';

/**
 * Admin Functions, these should only be exposed to the owner of the server
 */
const Routes = require('koa-router');
const db = require('../db');
const router = new Routes();

// return all the table names inside the DB
// NOTE: DANGEROUS
router.get('/tables', function*() {
  let res = yield db.querySqlFile('get_tables_list')
  this.body = res.rows
})


module.exports = router;
