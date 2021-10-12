import { PUSH_LOADING, POP_LOADING } from '../constants/ActionTypes'

export default (state = {}, action) => {
    switch(action.type) {
        case PUSH_LOADING:
            state = {
                ...state,
                counter: (state.counter ?? 0) + 1
            }
            break;
        case POP_LOADING:
            state = {
                ...state,
                counter: Math.max(0, (state.counter ?? 0) - 1)
            }
            break;
        }
    return state;
};
