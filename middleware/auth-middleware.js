/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import User from '../db/User.js';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (token) {
      const { user } = jwt.verify(token, process.env.SECRET_KEY);
      const findUser = await User.findByPk(user);

      req.user = findUser;
      // res.locals.user
      next();
    }
  } catch (err) {
    res.status(400).json({ error: 'User not exist' });
  }
};
