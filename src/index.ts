import express from 'express';
import 'express-async-errors';

import { PORT } from './util/config';
import { connectToDatabase } from './util/db';
import blogsRouter from './routes/blogs';
import { unknownEndpoint, errorHandler } from './util/middleware';

const app = express();
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });

};

void start();
