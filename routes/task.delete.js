import { Router } from 'express';
import Task from '../db/index.js';

const router = new Router();

router.delete(
  '/:userId/:id',
  async (req, res) => {
    try {
      const taskToDelte = await Task.destroy({ where: { id: req.params.id }, returning: true });

      if (!taskToDelte) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json({ message: 'Task deleted' });
    } catch (e) {
      return res.status(400).json({ message: 'Task not created', error: e.message });
    }
  },
);

export default router;
