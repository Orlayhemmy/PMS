const {
  Pool
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const db = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB
  : process.env.DATABASE_URI
  
const pool = new Pool({
  connectionString: db
});

const firstTable = 
`CREATE TABLE IF NOT EXISTS
  states(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    male INTEGER,
    female INTEGER,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
)`;
const secondTable = 
`CREATE TABLE IF NOT EXISTS
  cities(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    male INTEGER NOT NULL,
    female INTEGER NOT NULL,
    state_id VARCHAR(100) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id)
)`;
const queries = [firstTable, secondTable]

const action = (table, count = 0) => {
  if (table[count] !== undefined) {
    pool.connect()
    .then(client => {
      client.query(table[count])
      .then((res) => {
        console.log(res, table[count]);
        client.release();
      })
      .catch((err) => {
        client.release();
      });
      action(table, count + 1)
    }).catch((err) => {
    console.log(err)
    })
  }
}
/**
 * Create Tables
 */
const createTables = () => {
  action(queries);
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const dropState = 'DROP TABLE IF EXISTS states';
  const dropCities = 'DROP TABLE IF EXISTS cities';
  const dropQueries = [dropCities, dropState];

  action(dropQueries);
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');
