import { Router } from 'express';
import fs from 'fs';

const router = new Router();

router.patch('/:userId/:id', (req, res) => {
  fs.readFile('./__fixtures__/dataForGet.json', (err, data) => {
    try {
      if (err) throw err;
      const dataFromParse = JSON.parse(data);
      const { body } = req;
      const index = dataFromParse.tasks.findIndex((task) => task.uuid === body.uuid);
      if (index === -1) {
        return res.status(422).json({ message: 'Invalid fields in request' });
      }
      dataFromParse.tasks[index] = body;
      fs.writeFile('./__fixtures__/dataForGet.json', JSON.stringify(dataFromParse), (error) => {
        if (error) throw error;
        res.status(200).json(dataFromParse.tasks[index]);
      });
    } catch (e) {
      return res.status(400).json({ message: 'Task not created' });
    }
  });
});

export default router;
