import { Router } from 'express';
import fs from 'fs';

const router = new Router();

router.delete('/:userId/:id', (req, res) => {
  fs.readFile('./__fixtures__/dataForGet.json', (err, data) => {
    if (err) throw err;
    const dataFromParse = JSON.parse(data);
    const taskToDelte = dataFromParse.tasks.filter((task) => task.uuid === req.params.id);
    if (!taskToDelte.length) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const newTasks = dataFromParse.tasks.filter((task) => task.uuid !== req.params.id);
    dataFromParse.tasks = newTasks;
    dataFromParse.count = newTasks.length;
    fs.writeFile('./__fixtures__/dataForGet.json', JSON.stringify(dataFromParse), (error) => {
      if (error) throw error;
      res.status(200).json({ message: 'Task deleted' });
    });
  });
});

export default router;
