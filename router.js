import { Router } from 'express';
import fs from 'fs';

// const getFilePath = (filename) => path.resolve(__dirname, filename);

const router = new Router();

router.post('/task/:userId', async (req, res) => {
  await fs.readFile('./__fixtures__/dataForGet.json', async (err, data) => {
    if (err) throw err;
    const { body } = req;
    const dataTasks = JSON.parse(data);
    dataTasks.tasks.push(body);
    await fs.writeFile('./__fixtures__/dataForGet.json', JSON.stringify(dataTasks, null, 4), async (error) => {
      if (error) throw error;
      res.status(200).json(dataTasks);
    });
  });
});

router.get('/tasks/:userId', async (req, res) => {
  try {
    await fs.readFile('./__fixtures__/dataForGet.json', (err, data) => {
      if (err) throw err;
      res.status(200).json(JSON.parse(data));
    });
  } catch (e) {
    console.log(e);
  }
});
router.delete('/task/:userId/:id');
router.patch('/task/:userId/:id');

export default router;
