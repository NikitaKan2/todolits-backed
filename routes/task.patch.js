import { Router } from 'express';
import { param, validationResult } from 'express-validator';
import Task from '../db/index.js';

const router = new Router();

router.patch(
  '/task/:userId/:id',
  param('id').custom(async (value) => {
    const post = await Task.findAll({ where: { id: value } });
    if (!post.length) {
      throw new Error(`Task with id: ${value} not exist`);
    }
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const taskToUpdate = await Task.findOne({ where: { id: req.params.id } });

      const newTask = await Task.update({
        name: req.body.name ?? taskToUpdate.name,
        done: req.body.done ?? taskToUpdate.done,
      }, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      });

      return res.status(200).json(newTask[1]);
    } catch (e) {
      return res.status(400).json({ e });
    }
  },
);

export default router;
