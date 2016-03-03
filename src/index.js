'use strict';
require('dotenv').config(); // Load env vars from .env, always run this early
const koa = require('koa')
const config = require('./config')
const errors = require('./errors')
const sessions = require('./sessions')
const app = koa();

// heroku stuff
app.poweredBy = false;
// app.proxy = config.TRUST_PROXY;

// error handler
app.use(errors.handler)

// session handler
app.use(sessions.handler)

// Load all routes
app.use(require('./routes').routes());
app.use(require('./routes/admin').routes());
app.use(require('./routes/session').routes());

// run server
app.listen(config.PORT, () => {
  let serverEndpoint = (config.NODE_ENV == 'development') ? `http://localhost:${config.PORT}`: `${config.NODE_ENV} on ${config.PORT}`
  console.log(`
  ---------------------
  ~~~~~~~~~KOA~~~~~~~~~
  ---------------------
  ${serverEndpoint}
  `);
});
