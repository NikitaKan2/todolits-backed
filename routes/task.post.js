import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { body, validationResult } from 'express-validator';

const router = new Router();

router.post(
  '/:userId',
  body('name').isLength({ min: 3 }),
  (req, res) => {
    fs.readFile('./__fixtures__/dataForGet.json', (err, data) => {
      if (err) throw err;
      try {
        const normalizeTask = {
          ...req.body,
          done: false,
          uuid: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const dataTasks = JSON.parse(data);
        dataTasks.count = dataTasks.tasks.length;

        const sameName = dataTasks.tasks.filter((task) => task.name === req.body.name);

        if (sameName.length) {
          return res.status(401).json({ message: 'Task with the same name exist' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        dataTasks.tasks.push(normalizeTask);

        fs.writeFile('./__fixtures__/dataForGet.json', JSON.stringify(dataTasks, null, 4), (error) => {
          if (error) throw error;
          return res.status(200).json(normalizeTask);
        });
      } catch (e) {
        return res.status(422).json({ message: e.message });
      }
    });
  },
);

export default router;
