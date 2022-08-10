import Blog from './blog';
import User from './user';
import Reading from './reading';
import Session from './session';

Blog.belongsTo(User);
User.hasMany(Blog);

User.belongsToMany(Blog, { through: Reading, as: 'readingList' });
Blog.belongsToMany(User, { through: Reading, as: 'onReadingList' });

Session.belongsTo(User);
User.hasMany(Session);

export {
  Blog,
  User,
  Reading,
  Session,
};
