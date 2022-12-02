import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import Task from '../db/index.js';

const router = new Router();

router.patch(
  '/:userId/:id',
  param('id').custom(async (value) => {
    const post = await Task.findAll({ where: { id: value } });
    if (!post.length) {
      throw new Error(`Task with id: ${value} not exist`);
    }
  }),
  body('name').custom(
    async (value) => {
      const tasks = await Task.findAll({ where: { name: value } });
      if (tasks.length) {
        throw new Error('Task with same name exist');
      }
    },
  ),
  body('name')
    .isLength({ min: 3 })
    .withMessage('Message must be at least 3 character long "name" in body')
    .not()
    .isEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const taskToUpdate = await Task.findOne({ where: { id: req.params.id } });

      const newName = req.body.name ?? taskToUpdate.name;
      const newDone = 'done' in req.body && typeof req.body.done === 'boolean'
        ? req.body.done
        : taskToUpdate.done;

      const newTask = await Task.update({
        name: newName,
        done: newDone,
      }, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      });

      return res.status(200).json(newTask[1]);
    } catch (e) {
      return res.status(400).json({ message: 'Task not created' });
    }
  },
);

export default router;
