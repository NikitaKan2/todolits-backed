import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { readJsonData, writeJson } from '../utils/file-system.js';

const router = new Router();

router.patch(
  '/:userId/:id',
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Message must be at least 3 character long "name" in body')
    .custom(async (value) => {
      const dataTasks = await readJsonData();
      const checkName = dataTasks.tasks.filter((task) => task.name.trim() === value.trim());
      if (checkName.length) {
        throw new Error('Task with the same name exist');
      }
    }),
  body('done').optional().custom((value) => {
    if (typeof value !== 'boolean') {
      throw new Error('Field "done" must be "boolean" type');
    }
    return true;
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const dataFromParse = await readJsonData();
      const index = dataFromParse.tasks.findIndex((task) => task.uuid === req.params.id);
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
