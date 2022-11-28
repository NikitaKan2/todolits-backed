import express from 'express';
import router from './router.js';

const PORT = 4001;

const app = express();

app.use(express.json());
app.use('/', router);

const startApp = () => {
  try {
    app.listen(PORT, () => console.log(PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();
