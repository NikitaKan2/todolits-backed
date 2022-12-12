import { Router } from 'express';
import bcrypt from 'bcrypt';
import generateAccessToken from '../utils/jwt-service.js';
import User from '../db/User.js';

const router = new Router();

router.post('/login', async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    where: {
      name: req.body.name,
    },
  });

  const comparePasswords = await bcrypt.compare(req.body.password, user.password);
  if (!comparePasswords) {
    return res.send('error');
  }

  const accessToken = generateAccessToken({ user: user.uuid });
  return res.status(200).json({ accessToken });
});

export default router;
