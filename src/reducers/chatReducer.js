import { types } from '../types/types';

const init = {
    conversations: [],
    messages: [],
    activeChat: {},
    users: [],
    search: "",
}

export const chatReducer = (state = init, action) => {
    switch (action.type) {

        case types.getChats:
            return {
                ...state,
                conversations: action.payload
            }

        case types.getMessagesOfChat:
            return {
                ...state,
                messages: action.payload
            }

        case types.activeChat:
            return {
                ...state,
                activeChat: action.payload
            }

        case types.newMessage:
            const conversationUpdate = state.conversations.find(conversation => conversation.id_room === action.payload.id_room);
            conversationUpdate.id_user = action.payload.id_user;
            conversationUpdate.message = action.payload.message;
            conversationUpdate.createdAt = action.payload.createdAt;


            return {
                ...state,
                conversations: [conversationUpdate, ...state.conversations.filter(conversation => conversation.id_room !== action.payload.id_room)],
                messages: state.activeChat.id_room === action.payload.id_room ? [...state.messages, action.payload] : state.messages
            }

        case types.searchUsers:
            return {
                ...state,
                users: action.payload
            }

        case types.createConversation:
            return {
                ...state,
                conversations: [action.payload, ...state.conversations]
            }

        case types.filterConversations:
            return {
                ...state,
                search: action.payload
            }
        default:
            break;
    }
}