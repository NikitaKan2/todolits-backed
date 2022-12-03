import { Router } from 'express';
import { readJsonData } from '../utils/file-system.js';

const router = new Router();

router.get('/:userId', async (req, res) => {
  const countAndTasks = await readJsonData();
  console.log(countAndTasks);
  try {
    const {
      filterBy, order, pp, page,
    } = req.query;

    switch (order) {
      case 'asc':
        countAndTasks.tasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        break;
      case 'desc':
        countAndTasks.tasks.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      default:
        break;
    }

    const lastIndex = page * pp;
    const firstIndex = lastIndex - pp;

    const filtered = !filterBy
      ? countAndTasks.tasks
      : countAndTasks.tasks.filter((task) => task.done === (filterBy === 'done'));

    if (!pp || !page) {
      return res.status(200).json({
        count: filtered.length,
        tasks: filtered.slice(0, 5),
      });
    }

    return res.status(200).json({
      count: filtered.length,
      tasks: filtered.slice(firstIndex, lastIndex),
    });
  } catch (e) {
    return res.status(400).json({ message: 'Task not created' });
  }
});

export default router;
