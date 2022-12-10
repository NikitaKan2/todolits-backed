import express from 'express';
import recursiveReaddirSync from 'recursive-readdir-sync';
import cors from 'cors';
import authMiddleware from './middleware/auth-middleware.js';

const PORT = 4006;

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://nikitakan2.github.io'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authMiddleware);

recursiveReaddirSync('./routes')
  .forEach(async (file) => {
    const module = await import(`./${file}`);
    return app.use('/', module.default);
  });

const startApp = () => {
  try {
    app.listen(PORT, () => {
      console.log(PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
