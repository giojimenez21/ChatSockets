import React, { useContext, useEffect, useRef } from 'react';
import { Message } from './Message';
import { ChatContext } from '../../context/ChatContext';
import { MessageMultipleRoom } from './MessageMultipleRoom';
import { InputMessage } from './InputMessage';
import { socket } from '../../actions/socket';
import { newMessage } from '../../actions/chat';

export const Chat = () => {
    const messagesRef = useRef(null);
    const { chat, dispatch } = useContext(ChatContext);

    useEffect(() => {
        messagesRef.current?.scrollIntoView();
    }, [chat?.messages])


    useEffect(() => {
        socket?.on('sendMessageFront', (payload) => {
            console.log(payload);
            dispatch(newMessage(payload));
        });

    }, []);



    return (
        <div className='w-8/12 flex flex-col'>
            <div className="flex p-4 items-center bg-green-200">
                {
                    chat?.activeChat?.url_img === ""
                        ?
                        <div className="text-2xl text-center my-auto mr-4">
                            <i className='fa fa-users' />
                        </div>
                        :
                        <img
                            className="w-12 rounded-full mr-4"
                            src={chat?.activeChat?.url_img}
                        />
                }
                <h1 className='font-bold text-xl'>
                    {chat?.activeChat?.nameRoom}
                </h1>
            </div>
            <div className="mx-10 mt-4 overflow-y-scroll">
                {
                    chat?.messages?.map((message, i) => {
                        if (chat?.activeChat?.type !== "NORMAL") {
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
