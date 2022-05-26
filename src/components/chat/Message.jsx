import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Message = ({ message }) => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {
                user?.id !== message?.id_user
                    ?
                    <div className='flex mb-4'>
                        <p className='mr-auto max-w-md bg-green-400 text-white p-2 rounded-lg shadow'>
                            {message?.message}
                        </p>
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
