import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import db from '../db.js';

const router = new Router();

router.patch(
  '/:userId/:id',
  param('id').custom(async (value) => {
    console.log(value);
    const post = await db.query('SELECT * FROM posts where id = $1', [value]);
    if (!post.rows.length) {
      throw new Error('Invalid fields in request');
    }
  }),
  body('name').custom(
    async (value) => {
      const tasks = await db.query('SELECT * FROM posts where name = $1', [value]);
      if (tasks.rowCount) {
        throw new Error('Task with same name exist');
      }
    },
  ),
  async (req, res) => {
    try {
      const post = await db.query('SELECT * FROM posts where id = $1', [req.params.id]);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const updatedTask = {
        name: req.body.name ?? post.rows[0].name,
        done: req.body.done ?? post.rows[0].done,
        id: post.rows[0].id,
        createdAt: post.rows[0].createdat,
        updatedAt: new Date().toJSON(),
      };

      const updatedPost = await db.query(
        'UPDATE posts set name = $1, done = $2, createdAt = $3, updatedAt = $4 where id = $5 RETURNING *',
        [
          updatedTask.name,
          updatedTask.done,
          updatedTask.createdAt,
          updatedTask.updatedAt,
          req.params.id,
        ],
      );

      return res.status(200).json(updatedPost.rows[0]);
    } catch (e) {
      return res.status(400).json({ message: 'Task not created' });
    }
  },
);

export default router;
