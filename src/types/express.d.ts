import { Blog } from '../models';

declare global {
  namespace Express {
    interface Request {
      blog?: Blog
    }
  }
}
