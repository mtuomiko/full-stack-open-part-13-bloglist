/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// not creating type safe errors right now

import { ErrorRequestHandler, RequestHandler } from 'express';

const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error.name === 'NotFound') {
    return res.status(404).json({ error });
  }
  if (error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError' ||
    error.name === 'ValidationError'
  ) {
    return res.status(400).json({ error });
  }

  console.log(error);
  return next(error);
};

export {
  unknownEndpoint,
  errorHandler,
};
