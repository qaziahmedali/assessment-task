import { config } from '@/config';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const authService = {
  generateToken: (userId: string) => {
    return jwt.sign({ userId }, config.authSecretKey!, { expiresIn: '7d' });
  },

  getUserIdFromToken: async (req: NextRequest): Promise<string | null> => {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return null;
    }

    try {
      const decoded = jwt.verify(token, config.authSecretKey!) as {
        userId: string;
      };
      return decoded.userId;
    } catch (error) {
      return null;
    }
  },
};
