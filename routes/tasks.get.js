import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import Task from '../db/index.js';

const router = new Router();

router.get(
  '/tasks/:userId',
  query('pp').optional().isInt({ min: 5, max: 20 }),
  async (req, res) => {
    const {
      filterBy, order, pp, page,
    } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const lastIndex = page * pp;
    const firstIndex = lastIndex - pp;

    const sorting = order === '' ? 'desc' : order;

    const filtered = !filterBy
      ? await Task.findAll(
        {
          order: [['createdAt', sorting]],
        },
      )
      : await Task.findAll(
        {
          order: [['createdAt', sorting]],
          where:
        { done: filterBy === 'done' },
        },
      );

    if (!page || !pp) {
      return res.json({
        count: filtered.length,
        tasks: filtered,
      });
    }

    return res.json({
      count: filtered.length,
      tasks: filtered.slice(firstIndex, lastIndex),
    });
  },
);

export default router;
