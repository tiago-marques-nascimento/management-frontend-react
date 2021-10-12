import { LOGIN_JWT, LOGOUT_JWT } from '../constants/ActionTypes'

export default (state = {}, action) => {
    switch(action.type) {
        case LOGIN_JWT:
            state = {
                ...state,
                token: action.token,
                subject: action.subject,
                claims: action.claims
            }
            break;
        case LOGOUT_JWT:
            state = {
                ...state,
                token: undefined
            }
            break;
        }
    return state;
};
