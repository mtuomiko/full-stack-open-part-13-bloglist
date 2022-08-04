import 'dotenv/config';
import express from 'express';
import blogsRouter from './routes/blogs';

const app = express();
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.listen(3001, () => {
  console.log('Running on 3001...');
});
