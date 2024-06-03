import { Model } from 'sequelize';

export const convertToPlainObject = (data: Model[]): object[] => {
  return data.map(item => item.get({ plain: true }));
};