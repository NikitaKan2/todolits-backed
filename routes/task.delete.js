import { Router } from 'express';
import { getFileData, writeFile } from '../utils/file-system.js';

const router = new Router();

router.delete('/:userId/:id', async (req, res) => {
  try {
    const dataFromParse = await getFileData('./__fixtures__/dataForGet.json');
    const taskToDelte = dataFromParse.tasks.filter((task) => task.uuid === req.params.id);
    if (!taskToDelte.length) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const newTasks = dataFromParse.tasks.filter((task) => task.uuid !== req.params.id);
    dataFromParse.tasks = newTasks;
    dataFromParse.count = newTasks.length;
    await writeFile('./__fixtures__/dataForGet.json', dataFromParse);
    return res.status(200).json({ message: 'Task deleted' });
  } catch (e) {
    return res.status(400).json({ message: 'Task not created' });
  }
});

export default router;
