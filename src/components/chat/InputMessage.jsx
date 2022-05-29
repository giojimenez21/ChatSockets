import moment from 'moment';
import React, { useContext, useState} from 'react';
import { newMessage, sendNewMessage } from '../../actions/chat';
import { sendMessageSocket } from '../../actions/socket';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useForm } from '../../hooks/useForm';

export const InputMessage = () => {
    const { user } = useContext(AuthContext);
    const [stateMessage, setStateMessage] = useState()
    const { chat, dispatch: dispatchChat } = useContext(ChatContext);
    const [messageInput, handleMessage, reset] = useForm({
        message: ""
    });


    const sendMessage = async (e) => {
        e.preventDefault();
        if (messageInput.message !== "") {
            // Lo ponemos en el state
            dispatchChat(newMessage({
                ...messageInput,
                id_room: chat?.activeChat?.id_room,
                id_user: user.id,
                createdAt: moment(),
            }));

            reset();
            setStateMessage(true);
            const res = await sendNewMessage({
                ...messageInput,
                id_room: chat?.activeChat?.id_room
            });
            if (res) {
                // Lo mandamos al socket
                sendMessageSocket({
                    ...messageInput,
                    id_room: chat?.activeChat?.id_room,
                    id_user: user.id,
                    createdAt: moment(),
                    user: {
                        name: user.name
                    }
                });
            }
            setStateMessage(false);
        }
    }

    return (
        <div className="w-full bg-green-300 p-3 mt-auto">
            <form className='flex flex-row' onSubmit={sendMessage}>
                <input
                    className='w-full p-3 rounded-lg focus:outline-none'
                    placeholder='Escriba su mensaje...'
                    name='message'
                    value={messageInput?.message}
                    onChange={handleMessage}
                    type="text"
                    autoComplete='off'
                />
                <button type="submit" className='px-3 text-white text-xl' disabled={stateMessage}>
                    <i className='far fa-paper-plane'></i>
                </button>
            </form>
        </div>
    )
}
