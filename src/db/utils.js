'use strict';

const pg = require('co-pg')(require('pg'));
const config = require('../config');

/**
 * Helpers
 */
// Configure pg client to parse int8 into Javscript integer
pg.types.setTypeParser(20, val => val === null ? null : Number.parseInt(val, 10));
// And parse numerics into floats
pg.types.setTypeParser(1700, val => val === null ? null : Number.parseFloat(val));

/**
 * Queries
 */
function* query(sql, params) {
  const connResult = yield pg.connectPromise(config.DATABASE_URL)
  const client = connResult[0]
  const done = connResult[1]
  try {
    return yield client.queryPromise(sql, params)
  } finally {
    // Release client back to pool even upon query error
    done()
  }
}

function* queryOne(sql, params) {
  const result = yield query(sql, params);
  return result.rows[0]
}


module.exports = {
  query,
  queryOne
}
