import { Socket } from "socket.io";
import { validateJWT } from "../helpers/generate_jwt";

export const socketController = async (socket: Socket) => {
    const token: any = socket.handshake.headers["x-token"];
    const user: any = await validateJWT(token);

    if (!user) {
        console.log("Desconectado");
        return socket.disconnect();
    }

    console.log("Conectado:", user.name);

    // On disconnect client
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        return socket.disconnect();
    });

    socket.on("join", (room) => {
        console.log(`join ${room}`);
        socket.join(room);
    });

    socket.on("sendMessageBackend", (payload) => {
        console.log(payload);
        socket.to(payload.id_room).emit("sendMessageFront", payload);
    });
};
