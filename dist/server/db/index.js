'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();

var db = process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.DATABASE_URI;

var pool = new Pool({
  connectionString: db
});

module.exports = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  query: function query(text) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return pool.connect().then(function (client) {
      return client.query(text, params).then(function (res) {
        client.release();
        return res;
      }).catch(function (e) {
        client.release();
        return e;
      });
    }).catch(function (err) {
      console.log(err);
    });
  }
};