import { validationResult } from 'express-validator';

const checkRequest = async (data) => {
  const errorFormatter = ({ msg }) => `${msg}`;
  await validationResult(data).formatWith(errorFormatter).throw();
};

export default {
  checkRequest,
};
