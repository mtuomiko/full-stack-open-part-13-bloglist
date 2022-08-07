/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// not creating type safe errors right now

import jwt from 'jsonwebtoken';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { JWT_SECRET } from './config';
import { TokenData } from '../types/requests';

const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).send({ errors: [{ message: 'unknown endpoint' }] });
};

const mapErrors = (errors: any[]) => {
  return errors.map(error => {
    return {
      name: error.name,
      message: error.message,
    };
  });
};

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error.name === 'NotFound') {
    return res.status(404).json({ errors: [error] });
  }
  if (error.name === 'Unauthorized') {
    return res.status(401).json({ errors: [error] });
  }
  if (error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError' ||
    error.name === 'SequelizeForeignKeyConstraintError' ||
    error.name === 'ValidationError'
  ) {
    console.log(error);
    return res.status(400).json({
      errors: Array.isArray(error.errors) ? mapErrors(error.errors) : [error]
    });
  }
  if (error.name === 'Forbidden') {
    return res.status(403).json({ errors: [error] });
  }

  console.log(error);
  return next(error);
};

const tokenExtractor: RequestHandler = (req, res, next) => {
  const auth = req.get('authorization');

  if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ errors: [{ message: 'token missing' }] });
  }

  try {
    req.verifiedToken = jwt.verify(auth.substring(7), JWT_SECRET) as TokenData;
  } catch (error) {
    return res.status(401).json({ errors: [{ message: 'token invalid' }] });
  }

  return next();
};

export {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
