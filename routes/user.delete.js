import { Router } from 'express';
import User from '../db/User.js';

const router = new Router();

router.delete('/remove', (req, res) => {
  User.destroy({
    where: {
      name: req.body.name,
    },
  });
  return res.status(200).json('ok');
});

export default router;
