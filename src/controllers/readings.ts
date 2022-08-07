/* eslint-disable @typescript-eslint/no-misused-promises */
/* something with express v4 and handler promises */

import { RequestHandler } from 'express';

import Reading from '../models/reading';
import { toNewReadingRequest, toUpdateReadingRequest } from '../util/validation';

export const create: RequestHandler = async (req, res) => {
  const newReadingRequest = toNewReadingRequest(req.body);

  // skip checking existence of entities, will fail on DB constrainst is not okay
  const createdReading = await Reading.create({
    userId: newReadingRequest.user_id,
    blogId: newReadingRequest.blog_id,
  });

  res.json(createdReading);
};

export const updateRead: RequestHandler = async (req, res) => {
  if (!req.verifiedToken) { throw { name: 'Unauthorized', message: 'token missing or invalid' }; }

  const update = toUpdateReadingRequest(req.body);

  const id = req.params.id;
  const reading = await Reading.findByPk(id);
  if (!reading) { throw { name: 'NotFound' }; }

  if (reading.userId !== req.verifiedToken.id) {
    throw { name: 'Forbidden', message: "not allowed to update other user's readings" };
  }

  const updatedReading = await reading.update({ read: update.read });

  res.json(updatedReading);
};
