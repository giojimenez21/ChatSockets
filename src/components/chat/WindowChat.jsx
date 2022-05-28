import React, { useContext, useEffect } from 'react';
import { Chat } from './Chat';
import { newRoomSocket, socket } from '../../actions/socket';
import { createConversation, newMessage } from '../../actions/chat';
import { ChatBackground } from './ChatBackground';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

export const WindowChat = () => {
    const { user } = useContext(AuthContext);
    const { chat, dispatch } = useContext(ChatContext);

    useEffect(() => {
        socket?.on("sendMessageFront", (payload) => {
            dispatch(newMessage(payload));
        });

        socket?.on("sendMessageNewRoom", (payload) => {
            payload.usersRoom.forEach(userRoom => {
                if(userRoom.id === user.id){
                    dispatch(createConversation(payload));
                    newRoomSocket(payload.id_room);
                }
            })
        });
    }, []);

    return (
        <>
            {
                chat?.activeChat?.nameRoom !== undefined
                    ?
                    <Chat />
                    :
                    <ChatBackground />
            }
        </>
    )
}
