import { Router } from 'express';
import { readJsonData, writeJson } from '../utils/file-system.js';

const router = new Router();

router.delete('/task/:userId/:id', async (req, res) => {
  try {
    const dataFromParse = await readJsonData();
    const taskToDelte = dataFromParse.tasks.filter((task) => task.uuid === req.params.id);
    if (!taskToDelte.length) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const newTasks = dataFromParse.tasks.filter((task) => task.uuid !== req.params.id);
    dataFromParse.tasks = newTasks;
    dataFromParse.count = newTasks.length;

    await writeJson(dataFromParse);
    return res.status(200).json({ message: 'Task deleted' });
  } catch (e) {
    return res.status(400).json({ message: 'Task not created' });
  }
});

export default router;
