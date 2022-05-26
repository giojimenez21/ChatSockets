import { types } from '../types/types';

const init = {
    newMessageModal: false,
    newGroup: false
}

export const uiReducer = (state = init, action) => {
    switch (action.type) {
        case types.openModalNewMessage:
            return {
                ...state,
                newMessageModal: true
            }

        case types.closeModalNewMessage:
            return {
                ...state,
                newMessageModal: false
            }

        case types.openModalNewGroup:
            return {
                ...state,
                newGroup: true
            }

        case types.closeModalNewGroup:
            return {
                ...state,
                newGroup: false
            }

        default:
            break;
    }
}