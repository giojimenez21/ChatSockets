import { DataTypes } from "sequelize";
import { db } from "../database/config";
import { User } from "./User";

export const Message = db.define(
    "message",
    {
        message: {
            type: DataTypes.TEXT,
        },
        id_user: {
            type: DataTypes.INTEGER,
        },
        id_room: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.TIME,
        },
        updatedAt: {
            type: DataTypes.TIME,
        },
    },
    { 
        freezeTableName: true, 
        timestamps: true 
    }
);

Message.belongsTo(User, {foreignKey: "id_user"});
