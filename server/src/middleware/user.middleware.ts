import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { UserService } from '../services/users/users.service';

export const addUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const password = crypto.randomBytes(4).toString('hex');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body = { ...req.body, password: hashedPassword, rawPassword: password };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
 async (req: Request, res: Response) => {
    const { name, email, password, rawPassword } = req.body;
    const values = { name, email, password };
    const table = 'users';
    try {
      const userService = new UserService();
      await userService.addUser(res, table, values);
      // Mail gönderme işlemini burada yapabilirsiniz
      console.log(`The user's raw password: ${rawPassword}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };