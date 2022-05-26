import { types } from "../types/types";

const init = {
    logged: false
}

export const authReducer = (state = init, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }
            
        case types.logout:
            return {
                ...init
            }

        default:
            break;
    }


}