export default (name, sameName) => {
  if (name.trim() === '') {
    throw new Error('Message must be at least 1 character long "name" in body');
  }
  if (sameName.length) {
    throw new Error('Task with the same name exists');
  }
};
