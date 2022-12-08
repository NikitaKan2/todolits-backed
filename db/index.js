import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

let dbUrl;

if (process.env.NODE_ENV === 'development') {
  dbUrl = process.env.DB_URL;
}
if (process.env.NODE_ENV === 'production') {
  dbUrl = process.env.REMOTE_DB_URL;
}

const sequelize = new Sequelize(dbUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default sequelize;
