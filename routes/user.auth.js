import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/User.js';

const router = new Router();

router.post('/login', (req, res) => {
  const user = User.findOne({
    where: {
      uuid: req.user.uuid,
    },
  });
  if (!user) return res.status(401).json({ error: 'User not created' });

  const accessToken = jwt.sign({ user: user.id }, 'nikita', { expiresIn: '3d' });
  return res.status(200).json({ accessToken });
});

export default router;
