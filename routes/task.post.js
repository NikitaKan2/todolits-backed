import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Task from '../db/Task.js';

const router = new Router();

router.post(
  '/task/',
  async (req, res) => {
    try {
      const normalizeTask = await Task.create({
        name: req.body.name,
        id: uuidv4(),
        userId: req.user.uuid,
      });
      return res.status(200).json(normalizeTask);
    } catch (e) {
      if (e.errors[0].message === 'name must be unique') {
        e.errors[0].message = 'Task with same name exist';
        return res.status(400).json({ error: e.errors[0].message });
      }
      return res.status(400).json({ error: e.errors[0].message });
    }
  },
);

export default router;
