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
  console.log(user);
  const accessToken = jwt.sign({ user: user.id }, 'nikita', { expiresIn: '3d' });
  return res.json({ accessToken });
});

export default router;
