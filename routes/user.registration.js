import { Router } from 'express';
import bcrypt from 'bcrypt';
import generateAccessToken from '../utils/jwt-service.js';
import User from '../db/User.js';

const router = new Router();

router.post('/registration', async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 6);

  const user = await User.create(
    { name: req.body.name, password: hashPassword },
  );
  const accessToken = generateAccessToken({ user: user.uuid });
  return res.json({ accessToken });
});

export default router;
