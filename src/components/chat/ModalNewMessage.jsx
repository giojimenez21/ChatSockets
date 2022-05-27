import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition, Combobox } from '@headlessui/react'
import { useForm } from '../../hooks/useForm';
import { UiContext } from '../../context/UiContext';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { closeModalNewMessage } from '../../actions/ui';
import {
    createConversation,
    getLastMessages,
    newMessage,
    newRoom,
    searchUsersForChat,
    sendNewMessage,
    startGetLastMessages,
    usersFound
} from '../../actions/chat';
import { adapterTypeChat } from '../../adapters/adapters';
import moment from 'moment';
import { sendMessageSocket } from '../../actions/socket';


export const ModalNewMessage = () => {
    const [selected, setSelected] = useState({});
    const { user } = useContext(AuthContext);
    const { ui, dispatchUi } = useContext(UiContext);
    const { chat, dispatch: dispatchChat } = useContext(ChatContext);
    const [searchInput, handleSearch, reset] = useForm({
        search: "",
        message: "",
    });

    const searchUsers = async (search) => {
        const { resultUsers } = await searchUsersForChat(search);
        dispatchChat(usersFound(resultUsers));
    }

    const closeModal = () => {
        dispatchUi(closeModalNewMessage());
        reset();
        setSelected({});
    }

    const createAndSendMessage = async () => {
        if (searchInput?.search !== "" && searchInput?.message !== "") {
            // Buscamos que exista alguna conversacion
            const conversationExist = chat?.conversations.filter(conversation => conversation?.nameRoom === selected?.name);
            if (conversationExist.length > 0) {
                const res = await sendNewMessage({
                    message: searchInput?.message,
                    id_room: conversationExist[0]?.id_room
                });

                if (res) {
                    // const { resultMessages } = await startGetLastMessages();
                    // dispatchChat(getLastMessages(adapterTypeChat(resultMessages)));
                    dispatchChat(newMessage({
                        message: searchInput?.message,
                        id_room: conversationExist[0]?.id_room,
                        id_user: user.id,
                        createdAt: moment()
                    }));
                    sendMessageSocket({
                        message: searchInput?.message,
                        id_room: conversationExist[0]?.id_room,
                        id_user: user.id,
                        createdAt: moment()
                    })
                    closeModal();
                }
            } else {
                // Al no existir en el state creamos una nueva conversacion y mandamos el mensaje
                const data = await newRoom({
                    users: [
                        { id_user: selected?.id },
                        { id_user: user?.id }
                    ]
                });

                const res1 = await sendNewMessage({
                    message: searchInput?.message,
                    id_room: data?.id_room
                });

                if (res1) {
                    dispatchChat(createConversation({
                        id_room: data?.id_room,
                        nameRoom: selected?.name,
                        url_img: selected?.url_img,
                        id_user: user?.id,
                        message: searchInput?.message,
                        createdAt: moment(),
                        type: "NORMAL"
                    }));
                    closeModal();
                }
            }
        }
    }

    useEffect(() => {
        if (searchInput?.search !== "") {
            searchUsers(searchInput?.search);
        }
    }, [searchInput?.search])

    return (
        <>
            <Transition appear show={ui?.newMessageModal || false} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Combobox value={selected} onChange={setSelected}>
                                        <div className="relative mt-1">
                                            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                <Combobox.Input
                                                    className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
                                                    name='search'
                                                    autoComplete='off'
                                                    displayValue={user => user.name}
                                                    onChange={handleSearch}
                                                    placeholder='Buscar usuario...'
                                                />
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {chat?.users.length === 0
                                                        ? (
                                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                No se encontraron usuarios.
                                                            </div>
                                                        ) : (
                                                            chat?.users.map((user) => (
                                                                <Combobox.Option
                                                                    key={user.id}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={user}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <img
                                                                                    className='w-10 rounded-full mr-2'
                                                                                    src={user?.url_img}
                                                                                />
                                                                                <span
                                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                        }`}
                                                                                >
                                                                                    {user?.name}
                                                                                </span>
                                                                            </div>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                                        }`}
                                                                                >
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Combobox.Option>
                                                            ))
                                                        )}
                                                </Combobox.Options>
                                            </Transition>
                                        </div>
                                    </Combobox>

                                    <textarea
                                        className='w-full py-2 pl-3 shadow-md pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none '
                                        name='message'
                                        cols="30"
                                        rows="10"
                                        placeholder='Escriba su mensaje...'
                                        value={searchInput?.message}
                                        onChange={handleSearch}
                                    >
                                    </textarea>
                                    <button
                                        className='block mx-auto bg-green-400 p-2 rounded-md text-white shadow-md hover:bg-green-500'
                                        onClick={createAndSendMessage}>
                                        <i className="fas fa-paper-plane mr-2"></i>
                                        Enviar
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
