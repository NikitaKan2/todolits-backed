import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';
import { readJsonData, writeJson } from '../utils/file-system.js';

const router = new Router();

router.post(
  '/:userId',
  body('name')
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
  async (req, res) => {
    const dataTasks = await readJsonData();
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const normalizeTask = {
        name: req.body.name.trim(),
        done: false,
        uuid: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dataTasks.count = dataTasks.tasks.length;
      dataTasks.tasks.push(normalizeTask);

      await writeJson(dataTasks);
      return res.status(200).json(normalizeTask);
    } catch (e) {
      return res.status(422).json({ message: e.message });
    }
  },
);

export default router;
