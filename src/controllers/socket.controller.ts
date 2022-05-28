import { Socket } from "socket.io";
import { validateJWT } from "../helpers/generate_jwt";

export const socketController = async (socket: Socket) => {
    const token: any = socket.handshake.headers["x-token"];
    const user: any = await validateJWT(token);

    if (!user) {
        console.log("Desconectado");
        return socket.disconnect();
    }


    // On disconnect client
    socket.on("disconnect", () => {
        return socket.disconnect();
    });

    socket.on("join", (rooms) => {
        socket.join(rooms);
    });

    socket.on("newRoom", (room) => {
        socket.join(room);
    });

    socket.on("sendMessageBackendNewRoom", (payload) => {
        socket.broadcast.emit("sendMessageNewRoom", payload);
    });

    socket.on("sendMessageBackend", (payload) => {
        socket.to(payload.id_room).emit("sendMessageFront", payload);
    });
};
