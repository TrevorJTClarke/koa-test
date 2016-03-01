'use strict';

const config = require('../config');
const DB = require('./utils');
// const Admin = require('./utils');


/**
 * Admin
 */
// exports.Admin = Admin


/**
 * Db Testing!
 */
DB.getDbInfo = function*() {

  // // NOTE: creates a table and field values
  // let sql = `
  //   CREATE TABLE koadb(
  //     id SERIAL PRIMARY KEY,
  //     type VARCHAR(40) not null,
  //     title VARCHAR(40) not null,
  //     active BOOLEAN
  //   )
  // `

  // NOTE: adds item to table
  let sql = `
    INSERT INTO koadb VALUES (0, 'some type', 'some title', true);
  `

  // // NOTE: reads all items from table
  // let sql = `
  //   SELECT * FROM koadb;
  // `

  // // NOTE: reads one item from table
  // let sql = `
  //   SELECT * FROM koadb
  //     WHERE id = 0;
  // `

  // // NOTE: reads one item from table
  // let sql = `
  //   UPDATE koadb
  //     SET type = 'new type', title = 'new title'
  //     WHERE id = 0;
  // `

  // // NOTE: deletes one item from table
  // let sql = `
  //   DELETE FROM koadb WHERE id = 0;
  // `

  let data = yield db.query(sql)
  return data.rows
  // return data
}

module.exports = DB
