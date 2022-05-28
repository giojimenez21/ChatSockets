import { io } from "socket.io-client";

const URLBackend = import.meta.env.VITE_URL_BACKEND;

export let socket;
export const initiateSocket = () => {
    const socketNew = io(URLBackend, {
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