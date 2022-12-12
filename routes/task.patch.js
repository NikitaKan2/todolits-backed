import { Router } from 'express';
import { body } from 'express-validator';
import Task from '../db/Task.js';
import validate from '../utils/validate.js';

const router = new Router();

router.patch(
  '/task/:userId/:id',
  validate([
    body(['name', 'done']).exists().withMessage('Nothing to Update'),
  ]),
  async (req, res) => {
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
      if (e.errors[0].message === 'name must be unique') {
        e.errors[0].message = 'Task with same name exist';
        return res.status(400).json({ error: e.errors[0].message });
      }
      return res.status(400).json({ error: e.errors[0].message });
    }
  },
);

export default router;
