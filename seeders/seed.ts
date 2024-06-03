import bcrypt from 'bcryptjs';
import db from '../models';
import User from '../models/user';
import Contact from '../models/contact';

const seedData = async () => {
  await db.sequelize.sync({ force: true });

  const hashedPassword = await bcrypt.hash('password', 10);

  const user1 = await User.create({
    name: 'John Doe',
    phoneNumber: '1234567890',
    email: 'john@example.com',
    password: hashedPassword,
  });

  const user2 = await User.create({
    name: 'Jane Smith',
    phoneNumber: '0987654321',
    email: 'jane@example.com',
    password: hashedPassword,
  });

  await Contact.bulkCreate([
    { name: 'Alice', phoneNumber: '1111111111', userId: user1.id },
    { name: 'Bob', phoneNumber: '2222222222', userId: user1.id },
    { name: 'Charlie', phoneNumber: '3333333333', userId: user2.id },
    { name: 'Dave', phoneNumber: '4444444444', userId: user2.id },
  ]);

  console.log('Seed data created');
  process.exit();
};

seedData();
