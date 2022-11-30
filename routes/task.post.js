import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';
import { getFileData, writeFile } from '../utils/file-system.js';

const router = new Router();

router.post(
  '/:userId',
  body('name').isLength({ min: 3 }),
  async (req, res) => {
    try {
      const dataTasks = await getFileData('./__fixtures__/dataForGet.json');

      const sameName = dataTasks.tasks.filter((task) => task.name.trim() === req.body.name.trim());
      if (sameName.length) {
        return res.status(401).json({ message: 'Task with the same name exist' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Message must be at least 3 character long "name" in body:' });
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

      await writeFile('./__fixtures__/dataForGet.json', dataTasks);
      return res.status(200).json(normalizeTask);
    } catch (e) {
      return res.status(422).json({ message: e.message });
    }
  },
);

export default router;
