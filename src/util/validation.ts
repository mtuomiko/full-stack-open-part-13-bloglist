/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { LoginRequest, NewBlogRequest, NewReadingRequest, NewUserRequest, UpdateBlogRequest, UpdateReadingRequest, UpdateUserRequest } from '../types/requests';

const isString = (obj: any): obj is string => {
  return typeof obj === 'string';
};

const isNumber = (obj: any): obj is number => {
  return typeof obj === 'number';
};

const isBoolean = (obj: any): obj is boolean => {
  return typeof obj === 'boolean';
};

const validateString = (text: any, field: string): string => {
  if (!text || !isString(text)) {
    throw validationError(`property '${field}' not a string`);
  }
  return text;
};

const validateNumber = (num: any, field: string): number => {
  if (!num || !isNumber(num)) {
    throw validationError(`property '${field}' not a number`);
  }
  return num;
};

const validateBoolean = (bool: any, field: string): boolean => {
  if (!isBoolean(bool)) {
    throw validationError(`property '${field}' not a boolean`);
  }
  return bool;
};

export const stringToBoolean = (input: string): boolean => {
  const inputLowerCase = input.toLowerCase();
  if (inputLowerCase === 'true') { return true; }
  if (inputLowerCase === 'false') { return false; }

  throw validationError(`value ${input} not a boolean (true / false)`);
};

const validationError = (message: string) => {
  return {
    name: 'ValidationError',
    errors: [
      {
        message
      },
    ],
  };
};

export const toNewBlogRequest = (obj: any) => {
  const newBlog: NewBlogRequest = {
    url: validateString(obj.url, 'url'),
    title: validateString(obj.title, 'title'),
  };
  if (obj.author) { newBlog.author = validateString(obj.author, 'author'); }
  if (obj.likes) { newBlog.likes = validateNumber(obj.likes, 'likes'); }
  if (obj.year) { newBlog.year = validateNumber(obj.year, 'year'); }

  return newBlog;
};

export const toUpdateBlogRequest = (obj: any) => {
  const request: UpdateBlogRequest = {
    likes: validateNumber(obj.likes, 'likes')
  };

  return request;
};

export const toNewUserRequest = (obj: any) => {
  const newUser: NewUserRequest = {
    name: validateString(obj.name, 'name'),
    username: validateString(obj.username, 'username'),
    password: validateString(obj.password, 'password'),
  };

  return newUser;
};

export const toUpdateUserRequest = (obj: any) => {
  const request: UpdateUserRequest = {
    name: validateString(obj.name, 'name'),
  };

  return request;
};

export const toLoginRequest = (obj: any) => {
  const login: LoginRequest = {
    username: validateString(obj.username, 'username'),
    password: validateString(obj.password, 'password'),
  };

  return login;
};

export const toNewReadingRequest = (obj: any) => {
  const reading: NewReadingRequest = {
    blog_id: validateNumber(obj.blog_id, 'blog_id'),
    user_id: validateNumber(obj.user_id, 'user_id'),
  };

  return reading;
};

export const toUpdateReadingRequest = (obj: any) => {
  const update: UpdateReadingRequest = {
    read: validateBoolean(obj.read, 'read'),
  };

  return update;
};
