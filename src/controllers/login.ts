/* eslint-disable @typescript-eslint/no-misused-promises */
/* something with express v4 and handler promises */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import { toLoginRequest } from '../util/validation';
import { findUserByUsername } from './users';
import { JWT_SECRET } from '../util/config';
import { TokenData } from '../types/requests';

export const login: RequestHandler = async (req, res) => {
  const loginRequest = toLoginRequest(req.body);

  const user = await findUserByUsername(loginRequest.username);
  const passwordIsCorrect = user === null
    ? false
    : await bcrypt.compare(loginRequest.password, user.passwordHash);

  if (!(user && passwordIsCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }

  const tokenData: TokenData = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(tokenData, JWT_SECRET);

  return res.json({
    token,
    id: user.id,
    username: user.username,
    name: user.name,
  });
};
