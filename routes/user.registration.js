import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/User.js';

const router = new Router();

router.post('/registration', async (req, res) => {
  const checkUniq = await User.findOne({ where: { name: req.body.name } });
  if (checkUniq) {
    return res.status(400).json({ error: 'User must be uniq' });
  }
  const user = await User.create(
    { name: req.body.name, password: req.body.password },
  );
  const accessToken = jwt.sign(user.toJSON(), 'nikita', { expiresIn: '3d' });
  const refreshToken = jwt.sign(user.toJSON(), 'nikita-2', { expiresIn: '40d' });
  return res.json({ accessToken, user, refreshToken });
});

export default router;
