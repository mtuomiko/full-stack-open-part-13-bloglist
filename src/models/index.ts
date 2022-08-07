import Blog from './blog';
import User from './user';
import Reading from './reading';

Blog.belongsTo(User);
User.hasMany(Blog);

User.belongsToMany(Blog, { through: Reading, as: 'readingList' });
Blog.belongsToMany(User, { through: Reading, as: 'onReadingList' });

export {
  Blog,
  User,
  Reading,
};
