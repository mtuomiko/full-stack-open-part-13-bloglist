/* eslint-disable @typescript-eslint/no-misused-promises */
/* something with express v4 and handler promises */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import { toLoginRequest } from '../util/validation';
import { findUserByUsername } from './users';
import { JWT_SECRET } from '../util/config';
import { TokenData } from '../types/requests';
import { Session } from '../models';

export const login: RequestHandler = async (req, res) => {
  const loginRequest = toLoginRequest(req.body);

  const user = await findUserByUsername(loginRequest.username);
  const loginAllowed = user === null
    ? false
    : user.enabled && await bcrypt.compare(loginRequest.password, user.passwordHash);

  if (!(user && loginAllowed)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }

  const session = await Session.create({ userId: user.id });

  const tokenData: TokenData = {
    username: user.username,
    id: user.id,
    sessionId: session.id,
  };

  const token = jwt.sign(tokenData, JWT_SECRET);

  return res.json({
    token,
    id: user.id,
    username: user.username,
    name: user.name,
  });
};

export const logout: RequestHandler = async (req, res) => {
  if (!req.verifiedToken) { throw { name: 'Unauthorized', message: 'token missing or invalid' }; }

  await Session.destroy({
    where: {
      userId: req.verifiedToken.id
    }
  });

  res.send();
};
