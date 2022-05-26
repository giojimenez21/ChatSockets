import { Request, Response } from "express";
import { Op, QueryTypes } from "sequelize";
import { db } from "../database/config";
import { Message } from "../models/Message";
import { Room } from "../models/Room";
import { User } from "../models/User";
import { UserRoom } from "../models/UserRoom";

export const searchUser = async (req: Request, res: Response) => {
    const { search }: any = req.params;

    try {
        const resultUsers = await User.findAll({
            where: {
                name: {
                    [Op.substring]: search,
                },
                id: {
                    [Op.not]: req.id,
                },
            },
        });

        return res.status(200).json({
            resultUsers,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error,
        });
    }
};

export const newRoom = async (req: Request, res: Response) => {
    const { users, nameRoom } = req.body;
    console.log(nameRoom);
    try {
        const { id: id_room }: any = await Room.create({
            type: nameRoom ? nameRoom : "NORMAL",
        });

        users.forEach(async ({ id_user }: any) => {
            await UserRoom.create({
                id_room,
                id_user,
            });
        });

        return res.status(200).json({
            id_room,
            msg: "Room created",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error,
        });
    }
};

export const newMessage = async (req: Request, res: Response) => {
    const { message, id_room } = req.body;
    const { id: id_user } = req;
    try {
        await Message.create({
            message,
            id_room,
            id_user,
        });

        return res.status(200).json({
            msg: "Message send",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error,
        });
    }
};

export const lastMessageOfRoom = async (req: Request, res: Response) => {
    const { id_room }: any = req.params;

    try {
        const lastMessage = await Message.findOne({
            where: { id_room },
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            lastMessage,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error,
        });
    }
};

export const lastMessageOfRoomUser = async (req: Request, res: Response) => {
    const { id: id_user }: any = req;
    try {
        const lastMessages: any = await db.query(
            `
                SELECT m.id, m.message, m.createdAt, m.id_room, m.id_user, r.type
                FROM 
                (SELECT id_room, id_user from user_room where id_user = ${id_user}) AS x
                JOIN message AS m ON(x.id_room = m.id_room)
                JOIN room AS r ON(x.id_room = r.id)
                WHERE m.createdAt IN (SELECT MAX(createdAt) FROM message GROUP BY id_room)
                ORDER BY m.createdAt DESC;
        `,
            {
                type: QueryTypes.SELECT,
            }
        );

        // we get the other member of the room to be able to relate it to the last message

        const rooms: [] = lastMessages.map((message: any) => message.id_room);

        const participants = await UserRoom.findAll({
            include: "user",
            where: {
                id_room: rooms,
                id_user: {
                    [Op.not]: id_user,
                },
            },
        });

        let resultMessages: any = [];

        // lastMessages.forEach((message: any) =>{
        //     participants.forEach((participant: any) => {
        //         if(message.id_room === participant.id_room){
        //             resultMessages.push({
        //                 ...message,
        //                 otherParticipant:participant.user,
        //                 ejemplo:[...ejemplo, participant.user]
        //             });
        //         }
        //     });
        // });

        resultMessages = lastMessages.map((message: any) => {
            const participantsRoom: any = [];
            participants.forEach((participant: any) => {
                if (message.id_room === participant.id_room) {
                    participantsRoom.push(participant);
                }
            });

            return {
                ...message,
                participantsRoom,
            };
        });

        return res.status(200).json({
            resultMessages,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error,
        });
    }
};

export const getMessagesOfRoom = async (req: Request, res: Response) => {
    const { id_room }: any = req.params;
    try {
        const messages = await Message.findAll({
            where: { id_room },
            order: [["createdAt", "ASC"]],
            include: "user",
        });
        return res.status(200).json({
            messages,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error,
        });
    }
};
