import React, { useContext, useEffect } from 'react';
import { ItemAside } from './ItemAside';
import { NavbarAside } from './NavbarAside';
import { ChatContext } from '../../context/ChatContext';
import { getLastMessages, startGetLastMessages } from '../../actions/chat';
import { InputSearch } from './InputSearch';
import { ModalNewMessage } from '../chat/ModalNewMessage';
import { ModalNewGroup } from '../chat/ModalNewGroup';
import { adapterTypeChat } from '../../adapters/adapters';
import { joinRoom } from '../../actions/socket';

export const Aside = () => {
    const { chat, dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getMessagesAPI = async () => {
            const { resultMessages } = await startGetLastMessages();
            const messagesAdapted = adapterTypeChat(resultMessages);
            dispatch(getLastMessages(messagesAdapted));
            joinRoom(messagesAdapted.map(message => message?.id_room));
        }
        getMessagesAPI();
    }, []);



    return (
        <div className='w-4/12 overflow-y-scroll'>
            <NavbarAside />
            <InputSearch />
            {
                chat?.conversations
                    .filter(c => c.nameRoom.toLowerCase().includes(chat?.search) || !chat?.search)
                    .map(conversation => {
                    return (
                        <ItemAside
                            conversation={conversation}
                            key={conversation?.id_room}
                        />
                    )
                })
            }

            <ModalNewMessage />
            <ModalNewGroup />
        </div>
    )
}
