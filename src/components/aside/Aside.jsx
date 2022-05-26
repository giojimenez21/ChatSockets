import React, { useContext, useEffect } from 'react';
import { ItemAside } from './ItemAside';
import { NavbarAside } from './NavbarAside';
import { ChatContext } from '../../context/ChatContext';
import { getLastMessages, startGetLastMessages } from '../../actions/chat';
import { InputSearch } from './InputSearch';
import { ModalNewMessage } from '../chat/ModalNewMessage';
import { ModalNewGroup } from '../chat/ModalNewGroup';
import { adapterTypeChat } from '../../adapters/adapters';

export const Aside = () => {
    const { chat, dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getMessagesAPI = async () => {
            const { resultMessages } = await startGetLastMessages();
            dispatch(getLastMessages(adapterTypeChat(resultMessages)));
        }
        getMessagesAPI();
    }, []);
    

    return (
        <div className='w-4/12 overflow-y-scroll'>
            <NavbarAside />
            <InputSearch />
            {
                chat?.conversations?.map(conversation => {
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
