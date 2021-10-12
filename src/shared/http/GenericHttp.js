import axios from 'axios';
import { STORE } from '../..';
import { HISTORY } from '../../App';
import { ALERT_ERROR } from '../components/alert/Alert';
import { ADD_ALERT, PUSH_LOADING, POP_LOADING } from '../constants/ActionTypes';

const BASE_URL = 'https://localhost:8080/api';

class GenericHttp {

    constructor() {
    }

    get(url) {
        STORE.dispatch({type: PUSH_LOADING});
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}${url}`, this.setHttpHeaders())
                .then(item => {
                    STORE.dispatch({type: POP_LOADING});
                    resolve(item.data.data);
                })
                .catch(error => {
                    STORE.dispatch({type: POP_LOADING});
                    this.handleError(error);
                    reject(`Error: ${error}`);
                });
        });
    }

    post(url, body) {
        STORE.dispatch({type: PUSH_LOADING});
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}${url}`, body, this.setHttpHeaders())
                .then(item => {
                    STORE.dispatch({type: POP_LOADING});
                    resolve(item.data.data);
                })
                .catch(error => {
                    STORE.dispatch({type: POP_LOADING});
                    this.handleError(error);
                    reject(`Error: ${error}`);
                });
        });
    }

    put(url, body) {
        STORE.dispatch({type: PUSH_LOADING});
        return new Promise((resolve, reject) => {
            axios.put(`${BASE_URL}${url}`, body, this.setHttpHeaders())
                .then(item => {
                    STORE.dispatch({type: POP_LOADING});
                    resolve(item.data.data);
                })
                .catch(error => {
                    STORE.dispatch({type: POP_LOADING});
                    this.handleError(error);
                    reject(`Error: ${error}`);
                });
        });
    }

    delete(url) {
        STORE.dispatch({type: PUSH_LOADING});
        return new Promise((resolve, reject) => {
            axios.delete(`${BASE_URL}${url}`, this.setHttpHeaders())
                .then(item => {
                    STORE.dispatch({type: POP_LOADING});
                    resolve(item.data.data);
                })
                .catch(error => {
                    STORE.dispatch({type: POP_LOADING});
                    this.handleError(error);
                    reject(`Error: ${error}`);
                });
        });
    }

    setHttpHeaders() {
        const headers = {};
        headers['Content-Type'] = 'application/json';
        if(STORE.getState().jwt.token) {
            headers['Authorization'] = `Bearer ${STORE.getState().jwt.token}`;
        }
        return { headers };
    }

    handleError(error) {
        console.error(error);
        switch(error.response.status) {
            case 400:
                STORE.dispatch({type: ADD_ALERT, alert: {type: ALERT_ERROR, message: error.message}});
                break;
            case 401:
                HISTORY.push('/login');
                break;
            case 403:
                HISTORY.push('/unauthorized');
                break;
            default:
                STORE.dispatch({type: ADD_ALERT, alert: {type: ALERT_ERROR, message: 'Unexpected error, we are working to solve this'}});
                break;
        }
    }
}

export default GenericHttp;
