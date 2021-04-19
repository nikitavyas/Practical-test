import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

export const login = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const logInData = req.body;
    const user = await getRepository(User).findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = '';
        user.tempPassword = '';
        const token = jwt.sign({ sub: user.id },'practSec', { expiresIn: '7d' });
        return res.json({...user,token :token});
      } else {
        return res.json({msg:'Wrong credentials'});
      }
    } else {
      return res.json({msg:'Wrong credentials'});
    }
};