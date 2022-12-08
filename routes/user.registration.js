import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/User.js';

const router = new Router();

router.post('/registration', async (req, res) => {
  const user = await User.create({ name: req.body.name, password: req.body.password });
//   const accessToken = jwt.sign(user, 'secret-key');
  res.json(user);
});

export default router;
