import { NextFunction, Request, Response } from "express";
import { UserRoom } from "../models/UserRoom";

export const existInRoom = async(req: Request, res: Response, next: NextFunction) => {
    const { id: id_user }:any = req;
    const { id_room }:any = req.body;

    const exist = await UserRoom.findOne({
        where: { id_room, id_user }
    });

    if(!exist){
        return res.status(401).json({
            msg: "Not exist in the room"
        });
    }

    next();

}