import express from 'express';
import { addStates, fetchAllState, deleteState } from './controller/state';
import { addCities, updateCityData, deleteCity, fetchAllCities } from './controller/city';
import { validatePost, validateUpdateData } from './middleware/location';

const router = express.Router();

router.route('/states')
  .post(validatePost, addStates)
  .get(fetchAllState)

router.route('/states/:id')
  .delete(deleteState)

router.route('/cities')
  .post(validatePost, addCities)
  .get(fetchAllCities)
  
router.route('/cities/:id')
  .put(validateUpdateData, updateCityData)
  .delete(deleteCity)


export default router;
