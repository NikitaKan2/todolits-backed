import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(404);

  jwt.verify(token, 'nikita', (err, user) => {
    if (err) return res.status(404);
    req.user = user;
    next();
  });
};
