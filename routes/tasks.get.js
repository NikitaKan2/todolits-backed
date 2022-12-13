import { Router } from 'express';
import { query } from 'express-validator';
import { Op } from 'sequelize';
import validate from '../utils/validate.js';
import Task from '../db/Task.js';
import authMiddleware from '../middleware/auth-middleware.js';

const router = new Router();

router.get(
  '/tasks/',
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
  authMiddleware,
  async (req, res) => {
    try {
      const {
        filterBy, order, pp, page,
      } = req.query;

      const defaultValuesForPage = !page ? 1 : page;
      const defaultValueForPp = !pp ? 5 : pp;

      const filtered = await Task.findAndCountAll(
        {
          order: [['createdAt', !order ? 'desc' : order]],
          where: {
            [Op.and]: [
              { done: filterBy ? (filterBy === 'done') : [true, false] },
              { userId: req.user.uuid },
            ],
          },
          offset: (defaultValuesForPage - 1) * defaultValueForPp,
          limit: defaultValueForPp,
        },
      );

      return res.json({
        count: filtered.count,
        tasks: filtered.rows,
      });
    } catch (e) {
      return res.status(400).json({ error: e.errors[0].message });
    }
  },
);

export default router;
