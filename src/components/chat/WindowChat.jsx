import React, { useContext } from 'react';
import { Chat } from './Chat';
import { ChatBackground } from './ChatBackground';
import { ChatContext } from '../../context/ChatContext';

export const WindowChat = () => {
    const { chat } = useContext(ChatContext);
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
