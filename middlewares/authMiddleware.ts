// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

interface TokenPayload {
  userId: number;
  iat: number;
  exp: number;
}

interface RequestWithUser extends Request {
  user?: TokenPayload;
}

const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const tokenParts = authHeader.split(' ');

  if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as TokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
