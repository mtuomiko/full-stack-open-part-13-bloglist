import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import { PORT } from './util/config';
import { connectToDatabase } from './util/db';
import { blogsRouter, usersRouter, loginRouter, logoutRouter, authorsRouter, readinglistRouter } from './routes';

import { unknownEndpoint, errorHandler } from './util/middleware';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/readinglists', readinglistRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });

};

void start();
