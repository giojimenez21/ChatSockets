import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const MessageMultipleRoom = ({ message }) => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {
                user?.id !== message?.id_user
                    ?
                    <div className='flex mb-4'>
                        <div className='mr-auto max-w-md bg-green-400 text-white p-2 rounded-lg shadow'>
                            <span className='text-sm font-semibold'>
                                {message?.user?.name}
                            </span>
                            <p>
                                {message?.message}
                            </p>
                        </div>
                    </div>
                    :
                    <div className='flex mb-4'>
                        <p className='ml-auto max-w-md bg-gray-400 text-white p-2 rounded-lg shadow'>
                            {message?.message}
                        </p>
                    </div>
            }
        </>
    )
}
