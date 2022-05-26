import React from 'react';
import { searchUsersForChat } from '../../actions/chat';
import { useForm } from '../../hooks/useForm';

export const InputSearch = () => {
    const [inputSearch, handleSearch, reset] = useForm({
        search: ""
    })

    const searchUsers = async (e) => {
        e.preventDefault();
        const res = await searchUsersForChat(inputSearch.search);
        console.log(res);
    }

    const cleanSearch = () => {
        reset();
    }


    return (
        <div className="w-full p-3">
            <form className='flex' onSubmit={searchUsers}>
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
