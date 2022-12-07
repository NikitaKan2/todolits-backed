import express from 'express';
import recursiveReaddirSync from 'recursive-readdir-sync';
import cors from 'cors';

const PORT = 4003;

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://backend-for-todo-app.onrender.com/'],
};

app.use(cors(corsOptions));
app.use(express.json());

recursiveReaddirSync('./routes')
  .forEach(async (file) => {
    const module = await import(`./${file}`);
    return app.use('/', module.default);
  });

const startApp = () => {
  try {
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
};

startApp();
