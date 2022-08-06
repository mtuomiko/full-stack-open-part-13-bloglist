import { CreationAttributes } from 'sequelize';
import { Blog } from '../models';

export interface UpdateBlogRequest {
  likes: number;
}

// don't include incoming ids for new blogs
export type NewBlog = Omit<CreationAttributes<Blog>, 'id'>;
