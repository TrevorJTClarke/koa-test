'use strict';

const Routes = require('koa-router')
const config = require('../config')
const db = require('../db')
const router = new Routes()

// simple route for environment checking
router.get('/system', function*() {
  this.body = {
    userAgent: this.headers['user-agent'],
    server: {
      port: config.PORT,
      env: config.NODE_ENV
    }
  }
})

// simple route for environment checking
router.get('/db-overview', function*() {
  let database = { spec: {} }
  // TODO: unit test
  database.spec = yield db.getDbInfo()
  // database.spec = Object.assign.apply(null, yield db.getDbInfo())
  console.log('database', database);

  this.body = database
})


module.exports = router;
