import { Router } from 'express';
import Task from '../db/index.js';

const router = new Router();

router.delete(
  '/task/:userId/:id',
  async (req, res) => {
    try {
      const taskToDelete = await Task.destroy({ where: { id: req.params.id }, returning: true });

      if (!taskToDelete) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json({ message: 'Task deleted' });
    } catch (e) {
      return res.status(400).json({ message: 'Task not created', error: e.message });
    }
  },
);

export default router;
