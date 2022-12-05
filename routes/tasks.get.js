import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import { readJsonData } from '../utils/file-system.js';

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
    const countAndTasks = await readJsonData();
    try {
      const {
        filterBy, order, pp, page,
      } = req.query;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      switch (order) {
        case 'asc':
          countAndTasks.tasks.sort((a, b) => a.createdAt - b.createdAt);
          break;
        case 'desc':
          countAndTasks.tasks.sort((a, b) => b.createdAt - a.createdAt);
          break;
        default:
          break;
      }

      const lastIndex = page * pp;
      const firstIndex = lastIndex - pp;

      const filteredTasks = !filterBy
        ? countAndTasks.tasks
        : countAndTasks.tasks.filter((task) => task.done === (filterBy === 'done'));

      if (!pp || !page) {
        return res.status(200).json({
          count: filteredTasks.length,
          tasks: filteredTasks.slice(0, 5),
        });
      }

      return res.status(200).json({
        count: filteredTasks.length,
        tasks: filteredTasks.slice(firstIndex, lastIndex),
      });
    } catch (e) {
      return res.status(400).json({ message: 'Task not created' });
    }
  },
);

export default router;
