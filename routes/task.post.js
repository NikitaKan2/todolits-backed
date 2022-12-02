import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import Task from '../db/index.js';

const router = new Router();

router.post(
  '/:userId',
  body('name')
    .isLength({ min: 3 })
    .not()
    .isEmpty()
    .withMessage('Message must be at least 3 character long "name" in body'),
  body('name')
    .custom(async (value) => {
      const tasks = await Task.findAll({ where: { name: value } });
      if (tasks.length) {
        throw new Error('Task with same name exist');
      }
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const normalizeTask = await Task.create({
        name: req.body.name.trim(),
        id: uuidv4(),
        done: false,
      });

      return res.status(200).json(normalizeTask);
    } catch (e) {
      return res.status(400).json({ message: 'Task not created', error: e.message });
    }
  },
);

export default router;
