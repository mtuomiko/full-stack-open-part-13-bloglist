/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewBlog as NewBlogRequest, UpdateBlogRequest } from '../types/requests';

const isString = (obj: any): obj is string => {
  return typeof obj === 'string';
};

const isNumber = (obj: any): obj is number => {
  return typeof obj === 'number';
};

const validateString = (text: any, field: string): string => {
  if (!text || !isString(text)) {
    throw { name: 'ValidationError', message: `property '${field}' not a string` };
  }
  return text;
};

const validateNumber = (num: any, field: string): number => {
  if (!num || !isNumber(num)) {
    throw { name: 'ValidationError', message: `property '${field}' not a number` };
  }
  return num;
};

export const toNewBlogRequest = (obj: any): NewBlogRequest => {
  const newBlog: NewBlogRequest = {
    url: validateString(obj.url, 'url'),
    title: validateString(obj.url, 'title'),
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
