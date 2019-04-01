export const validatePost = ({ body: { male, female, name } }, res, next) => {
  const errors = {};

  if (!name) {
    errors.name = 'Name is required';
  }
  
  if (!male) {
    errors.male = "Male population is required"
  } else {
    if (!/^[0-9 ]+$/.test(male)) {
      errors.male = "Male population can only contain number";
    }
  }

  if (!female) {
    errors.female = "Female population is required"
  } else {
    if (!/^[0-9 ]+$/.test(female)) {
      errors.female = "Female population can only contain number";
    }
  }

  const isValid = Object.values(errors).length === 0;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  next();
}

export const validateUpdateData = ({ body: { male, female, name } }, res, next) => {
  const errors = {};
  
  if (male && !/^[0-9 ]+$/.test(male)) {
    errors.male = "Male population can only contain number";
  }

  if (female && !/^[0-9 ]+$/.test(female)) {
    errors.female = "Female population can only contain number";
  }


  const isValid = Object.values(errors).length === 0;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  next();
}
