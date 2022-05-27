import { Sequelize } from "sequelize";
import configDB from "./keys";

export const db = new Sequelize(configDB.db, configDB.user, configDB.password,{
    host: configDB.host,
    port: 3306,
    dialect: "mysql",
    define: {
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false
});