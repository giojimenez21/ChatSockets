import moment from 'moment';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { startGetMessagesOfChat, getMessagesOfChat, activeChatName } from '../../actions/chat';
import { joinRoom } from '../../actions/socket';

export const ItemAside = ({ conversation }) => {
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const date = moment();

    const activeChat = async () => {
        const { messages } = await startGetMessagesOfChat(conversation?.id_room);
        if (messages.length > 0) {
            dispatch(getMessagesOfChat(messages));
            dispatch(activeChatName(conversation));
        }
        joinRoom(conversation?.id_room);
    }


    return (
        <div className='p-4 flex border-b-2 border-gray-100 cursor-pointer hover:bg-green-50' onClick={activeChat}>
            <div className="w-1/6">
                {
                    conversation?.url_img === ""
                        ?
                        <div className="text-2xl text-center my-auto">
                            <i className='fa fa-users' />
                        </div>
                        :
                        <img
                            className="w-12 rounded-full"
                            src={conversation?.url_img}
                        />
                }
            </div>

            <div className="w-5/6">
                <div className='w-full'>
                    <div className="flex justify-between">
                        <h3 className="font-bold text-lg">{conversation?.nameRoom}</h3>
                        <span className='text-sm text-orange-500'>
                            {
                                moment(conversation.createdAt).isAfter(date) ? moment(conversation.createdAt).format("hh:mm") : moment(conversation.createdAt).format("DD/MM/YYYY")
                            }
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <p className='truncate'>
                            {
                                user?.id !== conversation?.id_user
                                    ? <span className='font-semibold'>{conversation?.message}</span>
                                    : `Tu: ${conversation?.message}`
                            }
                        </p>
                        {
                            user?.id !== conversation?.id_user ? <span className='rounded-full bg-orange-500 px-3'></span> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
