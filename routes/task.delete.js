import { Router } from 'express';
import { readJsonData, writeJson } from '../utils/file-system.js';

const router = new Router();

router.delete('/:userId/:id', async (req, res) => {
  try {
    const dataFromFile = await readJsonData();

    const taskToDelte = dataFromFile.tasks.filter((task) => task.uuid === req.params.id);
    if (!taskToDelte.length) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const newTasks = dataFromFile.tasks.filter((task) => task.uuid !== req.params.id);
    dataFromFile.tasks = newTasks;
    dataFromFile.count = newTasks.length;

    await writeJson(dataFromFile);
    return res.status(200).json({ message: 'Task deleted' });
  } catch (e) {
    return res.status(400).json({ message: 'Task not created' });
  }
});

export default router;
