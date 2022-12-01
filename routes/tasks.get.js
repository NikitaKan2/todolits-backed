import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import db from '../db.js';

const router = new Router();

router.get(
  '/:userId',
  query('pp').isInt({ min: 5, max: 20 }),
  async (req, res) => {
    try {
      const countAndTasks = await db.query('SELECT * FROM posts');
      const {
        filterBy, order, pp, page,
      } = req.query;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      switch (order) {
        case 'asc':
          countAndTasks.rows.sort((a, b) => a.createdat - b.createdat);
          break;
        case 'desc':
          countAndTasks.rows.sort((a, b) => b.createdat - a.createdat);
          break;
        default:
          break;
      }

      const lastIndex = page * pp;
      const firstIndex = lastIndex - pp;

      const filtered = !filterBy
        ? countAndTasks
        : await db.query('SELECT * FROM posts where done = $1', [filterBy === 'done']);

      return res.json({
        count: filtered.rowCount,
        tasks: filtered.rows.slice(firstIndex, lastIndex),
      });
    } catch (e) {
      return res.status(400).json({ message: 'Tasks not created', error: e.message });
    }
  },
);

export default router;
