import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

export default (user) => jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '365d' });
