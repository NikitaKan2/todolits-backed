import config from 'config';
import express from 'express';
import getRouter from './routes/tasks.get.js';
import postRouter from './routes/task.post.js';
import patchRouter from './routes/task.patch.js';
import deleteRouter from './routes/task.delete.js';
import redirectRouter from './routes/tasks.get.redirect.js';

const PORT = config.get('Customer.dbConfig.port');

const app = express();

app.use(express.json());

app.use('/tasks', getRouter);
app.use('/task', postRouter);
app.use('/task', patchRouter);
app.use('/task', deleteRouter);
app.use('/', redirectRouter);

const startApp = () => {
  try {
    app.listen(PORT, () => console.log(PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();
