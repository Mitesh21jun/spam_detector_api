import sequelize from '../config/config';
import User from './user';
import Contact from './contact';

User.hasMany(Contact, { as: 'contacts' });

const db = {
  sequelize,
  User,
  Contact,
};

export default db;
