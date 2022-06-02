import React from 'react';

export const ItemUserForRoom = ({ user, setUsersRoom }) => {

    const deleteUser = () => {
        setUsersRoom(users => users.filter(userR => userR.id !== user.id));
    }

    return (
        <button className='w-12 relative text-red-600 mr-2' onClick={deleteUser}>
            <img className='w-full rounded-full' src={user?.url_img}/>
            <i className='fa-solid fa-circle-xmark absolute top-0 right-0'/>
        </button>
    )
}
