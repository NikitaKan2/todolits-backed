import jwt from 'jsonwebtoken';

export default (user) => jwt.sign(user, 'nikita', { expiresIn: '365d' });
