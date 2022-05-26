import React, { useContext, useEffect, useRef } from 'react';
import { Message } from './Message';
import { ChatContext } from '../../context/ChatContext';
import { MessageMultipleRoom } from './MessageMultipleRoom';
import { InputMessage } from './InputMessage';

export const Chat = () => {
    const messagesRef = useRef(null);
    const { chat } = useContext(ChatContext);
    const { messages, activeChat } = chat;

    useEffect(() => {
        messagesRef.current?.scrollIntoView();
    }, [messages])


    return (
        <div className='w-8/12 flex flex-col'>
            <div className="flex p-4 items-center bg-green-200">
                <img className='w-10 rounded-full mr-4' src={activeChat?.url_img} />
                <h1 className='font-bold text-xl'>
                    {activeChat?.nameRoom}
                </h1>
            </div>
            <div className="mx-10 mt-4 overflow-y-scroll">
                {
                    messages?.map((message, i) => {
                        if (activeChat?.type !== "NORMAL") {
                            return (
                                <MessageMultipleRoom message={message} key={i} />
                            )
                        }
                        return (
                            <Message message={message} key={i} />
                        )
                    })
                }

                <div ref={messagesRef}></div>
            </div>

            <InputMessage />
        </div>
    )
}
