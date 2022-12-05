import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import Task from '../db/index.js';

const router = new Router();

router.get(
  '/tasks/:userId',
  query('pp').optional().isInt({ min: 5, max: 20 }),
  query('order').optional().custom((value) => {
    console.log(value);
    if (value !== 'asc' && value !== 'desc') {
      throw new Error('Order can be only "asc" or "desc"');
    }
    return true;
  }),
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

    const filtered = !filterBy
      ? await Task.findAll(
        {
          order: [['createdAt', order]],
        },
      )
      : await Task.findAll(
        {
          order: [['createdAt', order]],
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
