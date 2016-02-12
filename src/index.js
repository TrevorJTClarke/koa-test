'use strict';
require('dotenv').config(); // Load env vars from .env, always run this early
const koa = require('koa')
const config = require('./config')
const app = koa();

// heroku stuff
app.poweredBy = false;
// app.proxy = config.TRUST_PROXY;



// Load all routes
app.use(require('./routes').routes());

app.listen(config.PORT, () => {
  let serverEndpoint = (config.NODE_ENV == 'development') ? `http://localhost:${config.PORT}`: `${config.NODE_ENV} on ${config.PORT}`
  console.log(`
  ---------------------------
  ~~~~~~~~~~~~KOA~~~~~~~~~~~~
  ---------------------------
  ${serverEndpoint}
  `);
});
