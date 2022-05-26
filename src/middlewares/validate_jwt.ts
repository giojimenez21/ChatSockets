import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token:any = req.header("x-token");

    if(token === null){
        return res.status(400).json({
            msg:"Token not exist"
        });
    }

    try {
        const { id }: any = jwt.verify(token, process.env.SECRET_JWT!);
        const user = await User.findOne({ where: { id }});
        req.id = id;
        req.user = user;

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "invalid token"
        })
    }

    next();

}