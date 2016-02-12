'use strict';
// require('dotenv').config(); // Load env vars from .env, always run this early
const koa = require('koa')
const config = require('./config')
const app = koa();

// heroku stuff
app.poweredBy = false;
// app.proxy = config.TRUST_PROXY;





// TODO: Remove, these are just examples from koa
// x-response-time
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response
app.use(function *(){
  this.body = 'Hello World';
});

app.listen(config.PORT, () => {
  let serverEndpoint = (config.NODE_ENV == 'development') ? `http://localhost:${config.PORT}`: `${config.NODE_ENV} on ${config.PORT}`
  console.log(`
  ---------------------------
  ~~~~~~~~~~~~KOA~~~~~~~~~~~~
  ---------------------------
  ${serverEndpoint}
  `);
});
