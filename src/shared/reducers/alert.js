import { ADD_ALERT, REMOVE_ALERT } from '../constants/ActionTypes'

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_ALERT: {
            const alerts = state.alerts ? [...state.alerts] : [];
            alerts.push(action.alert);
            state = {
                ...state,
                alerts
            }
            break;
        }
        case REMOVE_ALERT: {
            const toBeRemovedIndex = state.alerts.indexOf(action.alert);
            state = {
                ...state,
                alerts: state.alerts.filter((alert, i) => i != toBeRemovedIndex)
            };
            break;
        }
    }
    return state;
};
