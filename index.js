import * as dotenv from 'dotenv';
import config from 'config';
import express from 'express';
import getRouter from './routes/tasks.get.js';
import postRouter from './routes/task.post.js';
import patchRouter from './routes/task.patch.js';
import deleteRouter from './routes/task.delete.js';
import redirectRouter from './routes/tasks.get.redirect.js';

dotenv.config();

const tasksEndpoint = process.env.TASKS_ENDPOINT;
const taskEndpoint = process.env.TASK_ENDPOINT;

const PORT = config.get('Customer.dbConfig.port');

const app = express();

app.use(express.json());

app.use(tasksEndpoint, getRouter);
app.use(taskEndpoint, postRouter);
app.use(taskEndpoint, patchRouter);
app.use(taskEndpoint, deleteRouter);
app.use('/', redirectRouter);

const startApp = () => {
  try {
    app.listen(PORT, () => console.log(PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();
