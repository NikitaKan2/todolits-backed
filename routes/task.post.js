import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Task from '../db/index.js';

const router = new Router();

router.post(
  '/task/:userId',
  async (req, res) => {
    try {
      const normalizeTask = await Task.create({
        name: req.body.name.trim(),
        id: uuidv4(),
      });

      return res.status(200).json(normalizeTask);
    } catch (e) {
      return res.status(400).json({ error: e.errors[0].message });
    }
  },
);

export default router;
