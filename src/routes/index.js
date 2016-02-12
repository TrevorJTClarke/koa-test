'use strict';

const Routes = require('koa-router');
const config = require('../config');
const router = new Routes();


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
  // TODO: error handling
  // TODO: unit test
  // TODO: db connection
  this.body = Object.assign.apply(null, yield [{ type: 'Postgres' }, { title: 'koa' }])
})


module.exports = router;
