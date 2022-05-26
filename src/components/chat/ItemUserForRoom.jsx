import React from 'react';

export const ItemUserForRoom = ({ user }) => {
    return (
        <div className='w-12 relative text-red-600 mr-2'>
            <img className='w-full rounded-full' src={user?.url_img}/>
            <i className='fa-solid fa-circle-xmark absolute top-0 right-0'/>
        </div>
    )
}
