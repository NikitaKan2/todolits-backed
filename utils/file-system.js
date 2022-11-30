import { promises as fs } from 'fs';

export const getFileData = async (filepath) => {
  const data = await fs.readFile(filepath);
  return JSON.parse(data);
};

export const writeFile = async (filepath, data) => {
  const stringifyData = JSON.stringify(data, null, 4);
  await fs.writeFile(filepath, stringifyData);
};
