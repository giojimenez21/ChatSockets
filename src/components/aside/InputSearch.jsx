import React, { useContext, useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { ChatContext } from '../../context/ChatContext'
import { filterConversations } from '../../actions/chat';

export const InputSearch = () => {
    const { chat, dispatch } = useContext(ChatContext);
    const [inputSearch, handleSearch, reset] = useForm({
        search: ""
    });

    const cleanSearch = () => {
        reset();
        dispatch(filterConversations(inputSearch?.search));
    }

    useEffect(() => {
        dispatch(filterConversations(inputSearch?.search));
    }, [inputSearch?.search])


    return (
        <div className="w-full p-3">
            <form className='flex'>
                <input className='w-full mx-auto p-2 rounded border focus:outline-none' type="text" autoComplete='off' name='search' value={inputSearch?.search} onChange={handleSearch} />
                {
                    inputSearch?.search !== ""
                    &&
                    <button className='text-xl text-red-400 p-2' onClick={cleanSearch} type='button'>
                        <i className='fa-solid fa-circle-xmark'></i>
                    </button>
                }
            </form>
        </div>
    )
}
