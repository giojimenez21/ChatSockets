import { types } from '../types/types';

const init = {
    conversations: [],
    messages: [],
    activeChat: "",
    users: []
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
            const [conversationUpdated] = state.conversations.filter(conversation => conversation.id_room === action.payload.id_room);

            const conversationUpdatedFinal = {
                ...conversationUpdated,
                id_user: action.payload.id_user,
                message: action.payload.message,
                createdAt: action.payload.createdAt
            }

            const conversationsFilter = state.conversations.filter(conversation => conversation.id_room !== action.payload.id_room);

            return {
                ...state,
                messages: [...state.messages, action.payload],
                conversations: [conversationUpdatedFinal, ...conversationsFilter]
            }

        case types.searchUsers:
            return {
                ...state,
                users: action.payload
            }
            
        default:
            break;
    }
}