import { Router } from 'express';
import { Op } from 'sequelize';
import Task from '../db/Task.js';
import authMiddleware from '../middleware/auth-middleware.js';

const router = new Router();

router.delete(
  '/task/:id',
  authMiddleware,
  async (req, res) => {
    try {
      const taskToDelete = await Task.destroy({
        where: {
          [Op.and]: [
            { name: req.body.name },
            { userId: req.user.uuid },
          ],
        },
        returning: true,
      });
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
