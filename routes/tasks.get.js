import { Router } from 'express';
import fs from 'fs';

const router = new Router();

router.get('/:userId', (req, res) => {
  try {
    fs.readFile('./__fixtures__/dataForGet.json', (err, data) => {
      if (err) throw err;
      const {
        filterBy, order, pp, page,
      } = req.query;
      const countAndTasks = JSON.parse(data);

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
    });
  } catch (e) {
    return res.status(400).json({ message: 'Task not created' });
  }
});

export default router;
