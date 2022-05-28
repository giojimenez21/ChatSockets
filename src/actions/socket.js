import { io } from "socket.io-client";

export let socket;

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

export const joinRoom = (rooms) => {
    socket.emit('join', rooms);
}

export const newRoomSocket = (room) => {
    socket.emit('newRoom', room);
}

export const sendMessageSocket = (message) => {
    socket.emit('sendMessageBackend', message);
}

export const sendMessageNewRoomSocket = (message) => {
    socket.emit('sendMessageBackendNewRoom', message);
}