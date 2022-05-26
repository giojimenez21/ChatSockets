import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useContext } from 'react';
import { logout } from '../../actions/auth';
import { openModalNewGroup, openModalNewMessage } from '../../actions/ui';
import { AuthContext } from '../../context/AuthContext';
import { UiContext } from '../../context/UiContext';

export const NavbarAside = () => {
    const { user, dispatch: dispatchUser } = useContext(AuthContext);
    const { dispatchUi } = useContext(UiContext);

    const startLogout = () => {
        localStorage.clear();
        dispatchUser(logout());
    }

    const openModalMessage = () => {
        dispatchUi(openModalNewMessage());
    }

    const openModalGroup = () => {
        dispatchUi(openModalNewGroup());
    }

    return (
        <>
            <div className='w-full p-4 flex justify-between items-center bg-green-200'>
                <div className='w-full flex items-center'>
                    <img
                        className='w-10 rounded-full mr-4'
                        src={user?.picture}
                    />
                    <h2 className='text-lg font-semibold'> {user?.name} </h2>
                </div>



                <div className="w-56 text-right">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <i className="fas fa-user-plus" />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        <button
                                            className='hover:bg-orange-400 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm'
                                            onClick={openModalMessage}
                                        >
                                            Nuevo mensaje
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button
                                            className='hover:bg-orange-400 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm'
                                            onClick={openModalGroup}
                                        >
                                            Crear grupo
                                        </button>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <i className="fas fa-bars" />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        <button
                                            className='hover:bg-orange-400 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm'
                                            onClick={startLogout}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </>
    )
}
