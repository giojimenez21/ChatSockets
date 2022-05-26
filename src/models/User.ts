import { DataTypes } from "sequelize";
import { db } from "../database/config";

export const User = db.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        url_img: {
            type: DataTypes.STRING,
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
