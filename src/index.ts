import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { db } from "./database/config";
import router from "./routers/auth.router";
import routerMessage from "./routers/message.router";
import { socketController } from "./controllers/socket.controller";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { 
        origin: "*" 
    },
});
const port: String | Number = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use("/auth", router);

app.use("/message", routerMessage);

io.on("connection", socketController);

//Check if the socket server is ready
server.listen(port, () => {
    console.log(`Servidor listo en el puerto ${port}`);
});

db.authenticate()
    .then((res) => {
        console.log("DB LISTA");
    })
    .catch((error) => {
        console.log(error);
    });
