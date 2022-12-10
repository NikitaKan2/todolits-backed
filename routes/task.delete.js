import { Router } from 'express';
import Task from '../db/Task.js';

const router = new Router();

router.delete(
  '/task/:id',
  async (req, res) => {
    try {
      const taskToDelete = await Task.destroy({ where: { id: req.params.id }, returning: true });
      if (!taskToDelete) {
        return res.status(404).json({ message: `Task with id: ${req.params.id} not found` });
      }

      return res.status(200).json({ message: 'Task deleted' });
    } catch (e) {
      return res.status(400).json({ message: 'Error on server', error: e.message });
    }
  },
);

export default router;
