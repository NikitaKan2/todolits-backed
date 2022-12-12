/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import User from '../db/User.js';

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (token) {
      const { user } = jwt.verify(token, 'nikita');
      const findUser = await User.findByPk(user);

      req.user = findUser;

      next();
    }
  } catch (err) {
    res.status(400).send('User not exist');
  }
};
