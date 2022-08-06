import { Blog, User } from '../models';
import { TokenData } from './requests';

declare global {
  namespace Express {
    interface Request {
      blog?: Blog
      user?: User
      verifiedToken?: TokenData
    }
  }
}
