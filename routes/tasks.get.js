import { Router } from 'express';
import { getFileData } from '../utils/file-system.js';

const router = new Router();

router.get('/:userId', async (req, res) => {
  try {
    const countAndTasks = await getFileData('./__fixtures__/dataForGet.json');
    const {
      filterBy, order, pp, page,
    } = req.query;

    if (page < 1 || pp > 20) {
      return res.status(422).json({ message: 'Invalid fields in request' });
    }

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

    if (filterBy === 'done') {
      const newTasks = countAndTasks.tasks.filter((task) => task.done);
      return res.status(200).json({
        count: newTasks.length,
        tasks: newTasks.slice(firstIndex, lastIndex),
      });
    }
    if (filterBy === 'undone') {
      const newTasks = countAndTasks.tasks.filter((task) => !task.done);
      return res.status(200).json({
        count: newTasks.length,
        tasks: newTasks.slice(firstIndex, lastIndex),
      });
    }
    return res.status(200).json({
      count: countAndTasks.tasks.length,
      tasks: countAndTasks.tasks.slice(firstIndex, lastIndex),
    });
  } catch (e) {
    return res.status(400).json({ message: 'Task not created' });
  }
});

export default router;
