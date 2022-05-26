import { DataTypes } from "sequelize";
import { db } from "../database/config";
import { User } from "./User";

export const UserRoom = db.define(
    "user_room",
    {
        id_room: {
            type: DataTypes.INTEGER,
        },
        id_user: {
            type: DataTypes.INTEGER,
        },
    },
    { freezeTableName: true }
);

UserRoom.belongsTo(User, {foreignKey: 'id_user'});