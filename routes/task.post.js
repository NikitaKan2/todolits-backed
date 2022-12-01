import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import db from '../db.js';

const router = new Router();

router.post(
  '/:userId',
  body('name')
    .isLength({ min: 3 })
    .isEmpty()
    .withMessage('Message must be at least 3 character long "name" in body')
    .custom(async (value) => {
      const tasks = await db.query('SELECT * FROM posts where name = $1', [value]);
      if (tasks.rowCount) {
        throw new Error('Task with same name exist');
      }
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const normalizeTask = {
        name: req.body.name.trim(),
        done: false,
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON(),
      };

      const newTask = await db.query(
        'INSERT INTO posts (name, done, createdAt, updatedAt) values ($1, $2, $3, $4) RETURNING *',
        [normalizeTask.name, normalizeTask.done, normalizeTask.createdAt, normalizeTask.updatedAt],
      );

      return res.status(200).json(newTask.rows[0]);
    } catch (e) {
      return res.status(400).json({ message: 'Task not created', error: e.message });
    }
  },
);

export default router;
