import { Router } from 'express';
import { readJsonData, writeJson } from '../utils/file-system.js';

const router = new Router();

router.patch('/:userId/:id', async (req, res) => {
  try {
    const dataFromFile = await readJsonData();
    const { body } = req;
    const index = dataFromFile.tasks.findIndex((task) => task.uuid === body.uuid);

    if (index === -1) {
      return res.status(422).json({ message: 'Invalid fields in request' });
    }

    dataFromFile.tasks[index] = body;

    await writeJson(dataFromFile);
    return res.status(200).json(dataFromFile.tasks[index]);
  } catch (e) {
    return res.status(400).json({ message: 'Task not created' });
  }
});

export default router;
