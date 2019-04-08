import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_OUT, AUTH_SIGN_IN, SHOW_DASHBOARD_SECRET } from './types';

export const signUp = data => {
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:5000/users/signup', data);
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.data_url,
            })
            //localStorage.setItem('JWT_TOKEN', res.data.token);
            //axios.defaults.headers.common['Authorization'] = res.data.token;
        }
        catch(error) {
            dispatch({
                type: AUTH_ERROR,
                payload:"Email is already in use",
            })
        }
    }
}

export const signIn = data => {
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:5000/users/signin', data);
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token,
            })
            localStorage.setItem('JWT_TOKEN', res.data.token);
            console.log(res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        }
        catch(error) {
            dispatch({
                type: AUTH_ERROR,
                payload:"Email or password incorrect",
            })
        }
    }
}
export const getSecret = () => {
    return async dispatch => {
        try{
            const res = await axios.get('http://localhost:5000/users/secret');
            dispatch({
                type : SHOW_DASHBOARD_SECRET,
                payload : res.data,
            })
        }
        catch(error){
            console.error("error",error);
        }
    }
}

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = '';
        dispatch({
            type : AUTH_SIGN_OUT,
            payload : ''
        })
    }
}