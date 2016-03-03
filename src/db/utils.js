'use strict';

const path = require('path');
// 3rd
const co = require('co');
const fs = require('co-fs');
// 1st
const pg = require('co-pg')(require('pg'));
const config = require('../config');

/**
 * Helpers
 */
// Configure pg client to parse int8 into Javscript integer
pg.types.setTypeParser(20, val => val === null ? null : Number.parseInt(val, 10));
// And parse numerics into floats
pg.types.setTypeParser(1700, val => val === null ? null : Number.parseFloat(val));

// Load a single sql file
function *loadSql(filePath) {
  const fullPath = path.join(__dirname, '../sql', filePath)
  return yield fs.readFile(fullPath, 'utf8')
}

/**
 * Use a sql query from a file, return the data
 */
function *querySqlFile(filePath) {
  const fullPath = path.join(__dirname, '../sql', `${filePath}.sql`)
  const fileData = yield fs.readFile(fullPath, 'utf8')
  return yield query(fileData)
}


/**
 * Queries
 */
function *query(sql, params) {
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
  loadSql,
  query,
  queryOne,
  querySqlFile
}
