import { Router } from 'express';
import { getFileData, writeFile } from '../utils/file-system.js';

const router = new Router();

router.patch('/:userId/:id', async (req, res) => {
  try {
    const dataFromParse = await getFileData('./__fixtures__/dataForGet.json');
    const { body } = req;
    const index = dataFromParse.tasks.findIndex((task) => task.uuid === body.uuid);

    if (index === -1) {
      return res.status(422).json({ message: 'Invalid fields in request' });
    }

    dataFromParse.tasks[index] = body;

    await writeFile('./__fixtures__/dataForGet.json', dataFromParse);
    return res.status(200).json(dataFromParse.tasks[index]);
  } catch (e) {
    return res.status(400).json({ message: 'Task not created' });
  }
});

export default router;
