import { Router } from 'express';
import db from '../db.js';

const router = new Router();

router.get('/:userId', async (req, res) => {
    const countAndTasks = await db.query('SELECT * FROM tasks');
    return res.json(countAndTasks[0]);
    // const {
    //   filterBy, order, pp, page,
    // } = req.query;

    // switch (order) {
    //   case 'asc':
    //     countAndTasks.tasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    //     break;
    //   case 'desc':
    //     countAndTasks.tasks.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    //     break;
    //   default:
    //     break;
    // }

    // const lastIndex = page * pp;
    // const firstIndex = lastIndex - pp;

    // if (filterBy === 'done') {
    //   const newTasks = countAndTasks.tasks.filter((task) => task.done);
    //   return res.status(200).json({
    //     count: newTasks.length,
    //     tasks: newTasks.slice(firstIndex, lastIndex),
    //   });
    // }
    // if (filterBy === 'undone') {
    //   const newTasks = countAndTasks.tasks.filter((task) => !task.done);
    //   return res.status(200).json({
    //     count: newTasks.length,
    //     tasks: newTasks.slice(firstIndex, lastIndex),
    //   });
    // }
    // return res.status(200).json({
    //   count: countAndTasks.tasks.length,
    //   tasks: countAndTasks.tasks.slice(firstIndex, lastIndex),
    // });
});

export default router;
