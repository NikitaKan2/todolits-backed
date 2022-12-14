import { Router } from 'express';
import { body } from 'express-validator';
import { Op } from 'sequelize';
import Task from '../db/Task.js';
import authMiddleware from '../middleware/auth-middleware.js';
import validate from '../utils/validate.js';

const router = new Router();

router.patch(
  '/task/:id',
  authMiddleware,
  validate([
    body(['name', 'done']).exists().withMessage('Nothing to Update'),
  ]),
  async (req, res) => {
    const checkUnique = await Task.findAll({
      where: {
        [Op.and]: [
          { name: req.body.name },
          { done: req.body.done },
          { userId: req.user.uuid },
        ],
      },
    });

    if (checkUnique.length) {
      return res.status(400).json({ error: 'Task with same name exist' });
    }

    try {
      const newTask = await Task.update({
        name: req.body.name,
        done: req.body.done,
      }, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });

      if (!newTask[0]) {
        return res.status(400).json({ error: `Task with id: ${req.params.id} not found` });
      }

      return res.status(200).json(newTask[1]);
    } catch (e) {
      return res.status(400).json({ error: e.errors[0].message });
    }
  },
);

export default router;
