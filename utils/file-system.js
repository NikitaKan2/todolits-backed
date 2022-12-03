import { promises as fs } from 'fs';

export const readJsonData = async () => {
  const data = await fs.readFile('./data/tasks.json');
  console.log(data);
  return JSON.parse(data);
};

export const writeJson = async (data) => {
  const stringifyData = JSON.stringify(data, null, 4);
  await fs.writeFile('./data/tasks.json', stringifyData);
};
