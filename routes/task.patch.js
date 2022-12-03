import { Router } from 'express';
import { body } from 'express-validator';
import { readJsonData, writeJson } from '../utils/file-system.js';

const router = new Router();

router.patch(
  '/:userId/:id',
  async (req, res) => {
    try {
      const dataFromParse = await readJsonData();
      console.log(req.params);
      const index = dataFromParse.tasks.findIndex((task) => task.uuid === req.params.id);
      console.log(index);
      if (index === -1) {
        return res.status(422).json({ message: `Task with id: ${req.params.id} not exist` });
      }

      const updatedTask = {
        name: req.body.name ?? dataFromParse.tasks[index].name,
        done: req.body.done ?? dataFromParse.tasks[index].done,
        uuid: dataFromParse.tasks[index].uuid,
        createdAt: dataFromParse.tasks[index].createdAt,
        updatedAt: new Date().toISOString(),
      };

      dataFromParse.tasks[index] = updatedTask;

      await writeJson(dataFromParse);
      return res.status(200).json(dataFromParse.tasks[index]);
    } catch (e) {
      return res.status(400).json({ message: 'Task not created' });
    }
  },
);

export default router;
