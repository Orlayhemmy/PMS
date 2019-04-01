const {
  Pool
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const db = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB
  : process.env.DATABASE_URI

  const pool = new Pool({
    connectionString: db,
  });

module.exports = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  query(text, params = null) {
    return pool.connect()
    .then(client => {
      return client.query(text, params)
      .then(res => {
            client.release();
            return res;
          })
          .catch(e => {
            client.release()
            return e;
          })
      }).catch((err) => {
        console.log(err)
      })
  }
};
