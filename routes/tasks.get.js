import { Router } from 'express';
import { query } from 'express-validator';
import validate from '../utils/validate.js';
import Task from '../db/Task.js';

const router = new Router();

router.get(
  '/tasks/:userId',
  validate([
    query('pp').optional().isInt({ min: 5, max: 20 }).withMessage('Query pp must be min 5 and max 20'),
    query('page').optional().isInt({ min: 1, max: 200 }).withMessage('Query page must be min 1 and max 200'),
    query('filterBy').optional().custom((value) => {
      if (!['', 'done', 'undone'].includes(value)) {
        throw new Error('Query filterBy must be empty string, "done" or "undone"');
      }
      return true;
    }),
  ]),
  async (req, res) => {
    const {
      filterBy, order, pp, page,
    } = req.query;

    const defaultValuesForPage = !page ? 1 : page;
    const defaultValueForPp = !pp ? 5 : pp;

    const filtered = await Task.findAndCountAll(
      {
        order: [['createdAt', !order ? 'desc' : order]],
        where:
        { done: filterBy ? (filterBy === 'done') : [true, false] },
        offset: (defaultValuesForPage - 1) * defaultValueForPp,
        limit: defaultValueForPp,
      },
    );

    return res.json({
      count: filtered.count,
      tasks: filtered.rows,
    });
  },
);

export default router;
