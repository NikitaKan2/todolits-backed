import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import Task from '../db/index.js';

const router = new Router();

router.get(
  '/:userId',
  query('pp').optional().isInt({ min: 5, max: 20 }),
  async (req, res) => {
    const countAndTasks = await Task.findAll();
    console.log(countAndTasks);
    const {
      filterBy, order, pp, page,
    } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    switch (order) {
      case 'asc':
        countAndTasks.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'desc':
        countAndTasks.sort((a, b) => b.createdAt - a.createdAt);
        break;
      default:
        break;
    }

    const lastIndex = page * pp;
    const firstIndex = lastIndex - pp;

    const filtered = !filterBy
      ? countAndTasks
      : await Task.findAll(
        {
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
      count: filtered.slice(firstIndex, lastIndex).length,
      tasks: filtered.slice(firstIndex, lastIndex),
    });
  },
);

export default router;
