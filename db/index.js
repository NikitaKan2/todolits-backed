import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const sequelize = new Sequelize(process.env.DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default sequelize;
