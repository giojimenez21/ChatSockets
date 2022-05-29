import configDev from "./dev";
import configProd from "./prod";

let configDB:any;

if (process.env.NODE_ENV !== "production") {
    configDB = configDev;
} else {
    configDB = configProd;
}

export default configDB;

