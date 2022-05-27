import { types } from "../types/types";

const URLBackend = import.meta.env.VITE_URL_BACKEND;

export const startGetLastMessages = async () => {
    try {
        const token = localStorage.getItem('token') || '';
        const res = await fetch(`${URLBackend}/message/lastMessageOfRoomUser`, {
            method: "GET",
            headers: {
                "x-token": token
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getLastMessages = (messages) => ({
    type: types.getChats,
    payload: messages
});

export const startGetMessagesOfChat = async (id_room) => {
    try {
        const token = localStorage.getItem('token') || '';
        const res = await fetch(`${URLBackend}/message/messagesOfRoom/${id_room}`, {
            method: "GET",
            headers: {
                "x-token": token
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getMessagesOfChat = (messagesOfChat) => ({
    type: types.getMessagesOfChat,
    payload: messagesOfChat
});

export const activeChatName = (nameChat) => ({
    type: types.activeChat,
    payload: nameChat
})

export const sendNewMessage = async (message) => {
    try {
        const token = localStorage.getItem('token') || '';
        const res = await fetch(`${URLBackend}/message/newMessage`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-token": token
            },
            body: JSON.stringify(message)
        });

        return res.ok;

    } catch (error) {
        console.log(error);
    }
}

export const newMessage = (message) => ({
    type: types.newMessage,
    payload: message
});

export const searchUsersForChat = async (search) => {
    try {
        const token = localStorage.getItem('token') || '';
        const res = await fetch(`${URLBackend}/message/searchUser/${search}`, {
            method: "GET",
            headers: {
                "x-token": token
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }

    } catch (error) {
        console.log(error);
    }
}

export const usersFound = (users) => ({
    type: types.searchUsers,
    payload: users
});

export const newRoom = async(users) => {
    try {
        const token = localStorage.getItem('token') || '';
        const res = await fetch(`${URLBackend}/message/newRoom`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-token": token
            },
            body: JSON.stringify(users)
        });

        if(res.ok){
            const data = await res.json();
            return data;
        }

    } catch (error) {
        console.log(error);
    }
}

export const createConversation = (conversation) => ({
    type: types.createConversation,
    payload: conversation
});