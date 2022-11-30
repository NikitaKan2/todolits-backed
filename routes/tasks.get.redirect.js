import { Router } from 'express';

const router = new Router();

router.use('/', (req, res) => {
  res.redirect('/tasks/6');
});

export default router;
