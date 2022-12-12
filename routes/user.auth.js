import { Router } from 'express';
import bcrypt from 'bcrypt';
import generateAccessToken from '../utils/jwt-service.js';
import User from '../db/User.js';

const router = new Router();

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (!user) {
      return res.status(401).json({ error: 'User not exist' });
    }
    const comparePasswords = await bcrypt.compare(req.body.password, user.password);
    if (!comparePasswords) {
      return res.status(401).json({ error: 'Password incorrect' });
    }

    const accessToken = generateAccessToken({ user: user.uuid });
    return res.status(200).json({ accessToken });
  } catch (e) {
    return res.status(404).json({ error: e.errors[0].message });
  }
});

export default router;
