/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// not creating type safe errors right now
/* eslint-disable @typescript-eslint/no-misused-promises */
// something with express v4 and handler promises
// TODO ^

import jwt from 'jsonwebtoken';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { JWT_SECRET } from './config';
import { TokenData } from '../types/requests';
import { Session, User } from '../models';

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

const tokenExtractor: RequestHandler = async (req, res, next) => {
  const auth = req.get('authorization');

  if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ errors: [{ message: 'token missing' }] });
  }

  try {
    const tokenData = jwt.verify(auth.substring(7), JWT_SECRET) as TokenData; // TODO: validate content
    const session = await Session.findByPk(tokenData.sessionId, {
      include: {
        model: User,
        attributes: ['id', 'enabled'],
      },
    });

    if (!session || !isValidSession(session, tokenData)) {
      return res.status(401).json({ errors: [{ message: 'token invalid' }] });
    }
    req.verifiedToken = tokenData;
  } catch (error) {
    return res.status(401).json({ errors: [{ message: 'token invalid' }] });
  }

  return next();
};

const isValidSession = (session: Session, tokenData: TokenData) => {
  if (session.userId !== tokenData.id) { return false; }

  const user = session.user;
  if (!user) { return false; }

  if (!user.enabled) { return false; }
  return true;
};

export {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
