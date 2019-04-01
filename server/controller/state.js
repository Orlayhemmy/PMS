import moment from 'moment';
import uuid from 'uuid';
import db from '../db';

export const addStates = async ({ body: { name, male, female }}, res) => {
  const checkState = `SELECT * FROM states WHERE name=$1`;
  const query = `INSERT INTO
    states(id, name, male, female, created_date, modified_date)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *
  `;
  const values = [
    uuid(),
    name,
    male = male || 0,
    female = female || 0,
    moment(new Date()),
    moment(new Date())
  ];
  const check = await db.query(checkState, [name]);
  
  if (check.rows.length) {
    return res.status(400).send({ message: `${name} state exists already` });
  }

  const { rows, err } = await db.query(query, values);

  if (rows[0]) return res.status(201).send({ message: `${name} added successfully`, data: rows[0] });
  return res.status(500).send({ err, message: 'Request cannot be completed at the moment' });
}

export const fetchAllState = async (req, res) => {
  const query = `SELECT s.id, s.name as state, c.name as city, s.male as state_male, s.female as state_female, c.male as city_male, c.female as city_female FROM states as s LEFT JOIN cities as c ON s.id = c.state_id`;
  const { rows, err } = await db.query(query);
  let obj = {};

  if (rows) {
    rows.forEach(element => {
      const { state, id, city, state_male, state_female, city_male, city_female } = element;

      obj[state] = obj[element.state]
        ? [...obj[element.state], {
            city,
            state_id: id,
            male: city_male,
            female: city_female,
          }]
        : [{
            state_id: id,
            city: city || state,
            male: city_male || state_male,
            female: city_female || state_female,
          }]
    });
    return res.status(200).send({ data: obj });
  }
  return res.status(500).send({ err, message: 'Request cannot be completed at the moment' });
}

export const deleteState = async ({ params: { id } }, res) => {
  const queryData = `SELECT * FROM
    cities WHERE state_id=$1
  `;
  const { rows, err } = await db.query(queryData, [id]);
  if (rows[0]) {
    return res.status(400).send({
      message: 'The state has sub-locations and cannot be deleted',
    });
  }

  const deleteQuery = `DELETE FROM
  states WHERE id=$1 returning *
  `;
  const result = await db.query(deleteQuery, [id]);
  if (result.rows[0]) {
    return res.status(200).send({
      message: `${result.rows[0].name} is deleted successfully`,
    });
  }
  return res.status(404).send({
    message: 'The state cannot be found',
  });
}
