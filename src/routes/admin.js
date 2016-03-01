'use strict';

/**
 * Admin Functions, these should only be exposed to the owner of the server
 */
const Routes = require('koa-router');
const config = require('../config');
const db = require('../db');
const router = new Routes();

// setup all the tables inside the DB
// NOTE: DANGEROUS
router.get('/tables', function*() {
  let sql = `
    SELECT table_name
      FROM information_schema.tables
    WHERE table_schema='public'
      AND table_type='BASE TABLE';
    `;
  let res = yield db.query(sql)

  this.body = res.rows
})

// // simple route for environment checking
// router.get('/db-overview', function*() {
//   let database = { spec: {} }
//   // TODO: unit test
//   database.spec = yield db.getDbInfo()
//   // database.spec = Object.assign.apply(null, yield db.getDbInfo())
//   console.log('database', database);
//
//   this.body = database
// })


module.exports = router;
