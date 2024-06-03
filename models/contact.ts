import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config';
import User from './user';

class Contact extends Model {
  public id!: number;
  public name!: string;
  public phoneNumber!: string;
  public isSpam!: boolean;
  public userId!: number;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    isSpam: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Contact',
  }
);

Contact.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Contact;
