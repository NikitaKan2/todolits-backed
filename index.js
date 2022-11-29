import express from 'express';
import getRouter from './routes/tasks.get.js';
import postRouter from './routes/task.post.js';
import patchRouter from './routes/task.patch.js';
import deleteRouter from './routes/task.delete.js';

const PORT = 4001;

const app = express();

app.use(express.json());
app.use('/tasks', getRouter);
app.use('/task', postRouter);
app.use('/task', patchRouter);
app.use('/task', deleteRouter);

const startApp = () => {
  try {
    app.listen(PORT, () => console.log(PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();
