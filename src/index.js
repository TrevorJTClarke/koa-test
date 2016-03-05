'use strict';
require('dotenv').config(); // Load env vars from .env, always run this early
const koa = require('koa')
const jwt = require('koa-jwt')
const body = require('koa-body')
const bouncer = require('koa-bouncer')
const config = require('./config')
const errors = require('./errors')
const sessions = require('./sessions')
const app = koa();

// heroku stuff
app.poweredBy = false;
// app.proxy = config.TRUST_PROXY;

// // error handler
// app.use(errors.handler)

// session handler
// app.use(sessions.handler)

// JWT Support
// app.use(jwt({ secret: config.JWT, passthrough: true }).unless({ path: [/^\/register/] }) )


app.use(body({ multipart: true }))
app.use(bouncer.middleware())

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
