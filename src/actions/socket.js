import { io } from "socket.io-client";

export let socket ;

export const initiateSocket = () => {
    const socketNew = io('http://localhost:8080', {
        'extraHeaders': {
            'x-token': localStorage.getItem('token') || ''
        },
    });
    socket = socketNew;
}

export const disconnectSocket = () => {
    socket.disconnect();
}

export const joinRoom = (room) => {
    socket.emit('join', room);
}

export const sendMessageSocket = (message) => {
    socket.emit('sendMessageBackend', message);
}