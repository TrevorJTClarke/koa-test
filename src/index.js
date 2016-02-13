'use strict';
require('dotenv').config(); // Load env vars from .env, always run this early
const koa = require('koa')
const config = require('./config')
const app = koa();

// heroku stuff
app.poweredBy = false;
// app.proxy = config.TRUST_PROXY;

// TODO: possible error handler
// app.use(function* errorHandler(next) {
//   try {
//     // catch all downstream errors
//     yield next;
//   } catch (err) {
//     // do something with the error
//   }
// })


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
