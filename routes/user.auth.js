import { Router } from 'express';
import User from '../db/User.js';

const router = new Router();

router.post('/login', (req, res) => {
  const user = User.findOne({
    where: {
      name: req.body.name,
    },
  });
  return res.status(200).json({ message: 'ok', user });
});

export default router;
