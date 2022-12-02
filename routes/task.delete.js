import { Router } from 'express';
import db from '../db.js';

const router = new Router();

router.delete(
  '/:userId/:id',
  async (req, res) => {
    try {
      const taskToDelte = await db.query('DELETE FROM posts where id = $1', [req.params.id]);

      if (!taskToDelte.rowCount) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json({ message: 'Task deleted' });
    } catch (e) {
      return res.status(400).json({ message: 'Task not created', error: e.message });
    }
  },
);

export default router;
