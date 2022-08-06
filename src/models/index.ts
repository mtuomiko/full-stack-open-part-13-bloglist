import Blog from './blog';
import User from './user';

User.hasMany(Blog);
Blog.belongsTo(User);

void Blog.sync({ alter: true });
void User.sync({ alter: true });

export {
  Blog,
  User,
};
