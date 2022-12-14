import { Router } from 'express';
import { body } from 'express-validator';
import generateAccessToken from '../utils/jwt-service.js';
import User from '../db/User.js';
import validate from '../utils/validate.js';

const router = new Router();

router.post('/registration', validate([
  body('password').notEmpty().withMessage('Password required'),
]), async (req, res) => {
  try {
    const user = await User.create(
      { name: req.body.name, password: req.body.password },
    );

    const accessToken = generateAccessToken({ user: user.uuid });
    return res.json({ accessToken });
  } catch (e) {
    return res.status(404).json({ error: e.errors[0].message });
  }
});

export default router;
