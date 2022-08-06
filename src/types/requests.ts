import { JwtPayload } from 'jsonwebtoken';
import { CreationAttributes } from 'sequelize';
import { Blog, User } from '../models';

/* blogs */

export interface UpdateBlogRequest {
  likes: number;
}

// don't include incoming ids for new blogs
export type NewBlogRequest = Omit<CreationAttributes<Blog>, 'id'>;

/* users and login*/

export interface UpdateUserRequest {
  name: string;
}

// don't include incoming ids or passwordHash for new users, but include password
export type NewUserRequest = Omit<CreationAttributes<User>, 'id' | 'passwordHash'> & { password: string };

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenData extends JwtPayload {
  username: string,
  id: number
}
