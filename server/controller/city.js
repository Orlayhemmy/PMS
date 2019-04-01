
import moment from 'moment';
import uuid from 'uuid';
import db from '../db';

const updateStateData = async (id, male, female) => {
  const checkState = `
  UPDATE states AS s
  SET male = c.sumMale + $2, female=c.sumFemale + $3
  FROM (
    SELECT id, SUM(female) sumFemale, SUM(male) sumMale FROM states WHERE id=$1 GROUP BY id
  ) c
  WHERE c.id = s.id`;

  const result = await db.query(checkState, [id, male, female]);
  
  if (result.command === 'UPDATE') return true;
  return false;
}

export const addCities = async ({ body: { name, male, female, state_id }}, res) => {
  const checkCity = `SELECT * FROM cities WHERE name=$1`;
  const query = `INSERT INTO
    cities(id, name, male, female, state_id, created_date, modified_date)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *
  `;
  const values = [
    uuid(),
    name,
    male = male || 0,
    female = female || 0,
    state_id,
    moment(new Date()),
    moment(new Date())
  ];
  const check = await db.query(checkCity, [name]);
  
  if (check.rows.length) {
    return res.status(400).send({ message: `${name} exists already` });
  }

  const { rows, err } = await db.query(query, values);

  if (rows[0]) {
    const isUpdated = await updateStateData(state_id, male, female);
    if (isUpdated) return res.status(201).send({ message: `${name} added successfully`, data: rows[0] });
  }
  return res.status(500).send({ err, message: 'Request cannot be completed at the moment' });
}

export const fetchAllCities = async (req, res) => {
  const query = `SELECT * FROM cities`;
  const { rows, err } = await db.query(query);

  if (rows) return res.status(200).send({ data: rows });
  return res.status(500).send({ err, message: 'Request cannot be completed at the moment' });
}

export const updateCityData = async ({ params: { id }, body: { name, male, female }}, res) => {
  const getDataquery = `SELECT * FROM cities where id = $1`;
  const { rows, err } = await db.query(getDataquery, [id]);
  const query = `UPDATE cities SET name=$1, male=$2, female=$3, modified_date=$4 WHERE id=$5`;
  const values = [
    name = name || rows[0].name,
    male = male || rows[0].male,
    female = female || rows[0].female,
    moment(new Date()),
    id
  ];
  const result = await db.query(query, values);
  if (result.rowCount) {
    const isUpdated = await updateStateData(rows[0].state_id, male, female);
    if (isUpdated) return res.status(200).send({ message: 'Update Successful' });
  }
  return res.status(500).send({ message: 'Network Error' });
}

export const deleteCity = async ({ params: { id } }, res) => {
  const query = `DELETE FROM
    cities WHERE id=$1 returning *
  `;
  const { rows, err } = await db.query(query, [id]);
  if (rows[0]) {
    return res.status(200).send({
      message: `${rows[0].name} is deleted successfully`,
    });
  }

  return res.status(404).send({
    message: 'The city cannot be found',
  });
}
