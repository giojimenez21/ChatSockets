import { DataTypes } from "sequelize";
import { db } from "../database/config";

export const Room = db.define(
    "room",
    {
        type: {
            type: DataTypes.STRING,
            defaultValue: "NORMAL"
        },
    },
    { freezeTableName: true }
);
