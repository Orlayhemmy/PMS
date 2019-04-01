'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();

var db = process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.DATABASE_URI;

var pool = new Pool({
  connectionString: db
});

var firstTable = 'CREATE TABLE IF NOT EXISTS\n  states(\n    id VARCHAR(100) PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    male INTEGER,\n    female INTEGER,\n    created_date TIMESTAMP,\n    modified_date TIMESTAMP\n)';
var secondTable = 'CREATE TABLE IF NOT EXISTS\n  cities(\n    id VARCHAR(100) PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    male INTEGER NOT NULL,\n    female INTEGER NOT NULL,\n    state_id VARCHAR(100) NOT NULL,\n    created_date TIMESTAMP,\n    modified_date TIMESTAMP,\n    FOREIGN KEY (state_id) REFERENCES states(id)\n)';
var queries = [firstTable, secondTable];

var action = function action(table) {
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (table[count] !== undefined) {
    pool.connect().then(function (client) {
      client.query(table[count]).then(function (res) {
        console.log(res, table[count]);
        client.release();
      }).catch(function (err) {
        client.release();
      });
      action(table, count + 1);
    }).catch(function (err) {
      console.log(err);
    });
  }
};
/**
 * Create Tables
 */
var createTables = function createTables() {
  action(queries);
};

/**
 * Drop Tables
 */
var dropTables = function dropTables() {
  var dropState = 'DROP TABLE IF EXISTS states';
  var dropCities = 'DROP TABLE IF EXISTS cities';
  var dropQueries = [dropCities, dropState];

  action(dropQueries);
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables: createTables,
  dropTables: dropTables
};

require('make-runnable');