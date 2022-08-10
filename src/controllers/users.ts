/* eslint-disable @typescript-eslint/no-misused-promises */
/* something with express v4 and handler promises */

import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import { Blog, User } from '../models';
import { stringToBoolean, toNewUserRequest, toUpdateUserRequest } from '../util/validation';
import { UserResponse } from '../types/requests';

const saltRounds = 10;

export const getAll: RequestHandler = async (_req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    },
  });

  res.json(users);
};

export const create: RequestHandler = async (req, res) => {
  const newUserRequest = toNewUserRequest(req.body);

  const passwordHash = await bcrypt.hash(newUserRequest.password, saltRounds);

  const newUser = {
    name: newUserRequest.name,
    username: newUserRequest.username,
    passwordHash,
  };

  const createdUser = await User.create(newUser);
  const userResponse = createUserResponse(createdUser);

  res.json(userResponse);
};

/*
  Not handling user not found errors here since we don't type safely guarantee a Blog will exist in the Request,
  meaning any route handler using blogFinder will still need to verify the existance
*/
export const userFinder: RequestHandler = async (req, _res, next) => {
  const username = req.params.username;
  const user = await findUserByUsername(username);

  if (user) { req.user = user; }

  next();
};

export const findUserByUsername = async (username: string) => {
  const user = await User.findOne({ where: { username } });

  return user;
};

export const updateName: RequestHandler = async (req, res) => {
  if (!req.user) { throw { name: 'NotFound' }; }

  const updateUserRequest = toUpdateUserRequest(req.body);
  const updatedUser = await req.user.update({ name: updateUserRequest.name });
  const userResponse = createUserResponse(updatedUser);

  res.json(userResponse);
};

export const getOne: RequestHandler = async (req, res) => {
  const bookReadWhereClause: { read?: boolean } = {};

  if (req.query.read) {
    const bookHasBeenRead = stringToBoolean(req.query.read as string); // TODO: check stringness

    bookReadWhereClause.read = bookHasBeenRead;
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['passwordHash'] },
    include: [
      {
        model: Blog,
        as: 'readingList',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['id', 'read'],
          where: bookReadWhereClause
        },
      }
    ]
  });

  res.json(user);
};

const createUserResponse = (user: User) => {
  const userResponse: UserResponse = {
    id: user.id,
    username: user.username,
    name: user.name,
    enabled: user.enabled,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return userResponse;
};
