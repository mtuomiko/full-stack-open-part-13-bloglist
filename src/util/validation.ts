/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { LoginRequest, NewBlogRequest, NewUserRequest, UpdateBlogRequest, UpdateUserRequest } from '../types/requests';

const isString = (obj: any): obj is string => {
  return typeof obj === 'string';
};

const isNumber = (obj: any): obj is number => {
  return typeof obj === 'number';
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

export const toNewBlogRequest = (obj: any): NewBlogRequest => {
  const newBlog: NewBlogRequest = {
    url: validateString(obj.url, 'url'),
    title: validateString(obj.title, 'title'),
  };
  if (obj.author) { newBlog.author = validateString(obj.author, 'author'); }
  if (obj.likes) { newBlog.likes = validateNumber(obj.likes, 'likes'); }

  return newBlog;
};

export const toUpdateBlogRequest = (obj: any): UpdateBlogRequest => {
  const request: UpdateBlogRequest = {
    likes: validateNumber(obj.likes, 'likes')
  };

  return request;
};

export const toNewUserRequest = (obj: any): NewUserRequest => {
  const newUser: NewUserRequest = {
    name: validateString(obj.name, 'name'),
    username: validateString(obj.username, 'username'),
    password: validateString(obj.password, 'password'),
  };

  return newUser;
};

export const toUpdateUserRequest = (obj: any): UpdateUserRequest => {
  const request: UpdateUserRequest = {
    name: validateString(obj.name, 'name'),
  };

  return request;
};

export const toLoginRequest = (obj: any): LoginRequest => {
  const login: LoginRequest = {
    username: validateString(obj.username, 'username'),
    password: validateString(obj.password, 'password'),
  };

  return login;
};
