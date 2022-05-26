import { Socket } from "socket.io";
import { validateJWT } from "../helpers/generate_jwt";

export const socketController = async(socket:Socket) => {
    const token:any = socket.handshake.headers['x-token'];
    const user:any = await validateJWT(token);    

    if(!user){
        return socket.disconnect();
    }

    // create room socket

    socket.join(user.id);

    
};

