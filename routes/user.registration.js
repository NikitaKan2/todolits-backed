import { Router } from 'express';
import bcrypt from 'bcrypt';
import { body } from 'express-validator';
import generateAccessToken from '../utils/jwt-service.js';
import User from '../db/User.js';
import validate from '../utils/validate.js';

const router = new Router();

router.post('/registration', validate([
  body('password').notEmpty().withMessage('Password required'),
]), async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 6);

    const user = await User.create(
      { name: req.body.name, password: hashPassword },
    );

    const accessToken = generateAccessToken({ user: user.uuid });
    return res.json({ accessToken });
  } catch (e) {
    return res.status(404).json({ error: e.errors[0].message });
  }
});

export default router;
