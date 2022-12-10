/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  console.log(req);
  const token = req.headers.authorization.replace('Bearer', '');
  if (!token) return res.status(404);

  jwt.verify(token, 'nikita', (err, user) => {
    if (err) return res.status(404);
    req.user = user;
    next();
  });
};
