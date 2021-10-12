import { OPEN_CONFIRMATION } from '../constants/ActionTypes'
import { CLOSE_CONFIRMATION } from '../constants/ActionTypes'

export default (state = {}, action) => {
    switch(action.type) {
        case OPEN_CONFIRMATION:
            state = {
                ...state,
                opened: true,
                confirmationHandler: action.confirmationHandler,
                cancellationHandler: action.cancellationHandler
            }
            break;
        case CLOSE_CONFIRMATION:
            state = {
                ...state,
                opened: false
            }
            break;
        }
    return state;
};
