import express from 'express';
import recursiveReaddirSync from 'recursive-readdir-sync';

const PORT = 4001;

const app = express();

app.use(express.json());

recursiveReaddirSync('./routes')
  .forEach(async (file) => {
    const module = await import(`./${file}`);
    return app.use('/', module.default);
  });

const startApp = () => {
  try {
    app.listen(PORT, () => console.log(PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();
