import {Service} from "../service";
import {getMessageActionCreator} from "./messages.actions";

let service = new Service();

const FETCHING_USERS = 'FETCHING_USERS';
const FETCHING_CURRENT_USER = 'FETCHING_CURRENT_USER';
const GET_CURRENT_USER = 'GET_CURRENT_USER';
const GET_USERS = 'GET_USERS';
const CLEAR_USERS = 'CLEAR_USERS';

const fetchingUsersActionCreator = () => ({type: FETCHING_USERS} as const);

export const clearUsersActionCreator = () => ({type: CLEAR_USERS} as const);

const fetchingCurrentUserActionCreator = () => ({type: FETCHING_CURRENT_USER} as const);

const getCurrentUserActionCreator = (user: any) => {
    return {
        type: GET_CURRENT_USER,
        payload: user
    }
};

const getUsersActionCreator = (users: any, hasMore: any) => {
    return {
        type: GET_USERS,
        users,
        hasMore
    }
};


export const loginUserThunk = (email: any, history: any) => async (dispatch: any) => {
    if (email.trim() !== '') {
        let service = new Service();
        let res = await service.loginUser(email);
        if (res.status > 400) {
            let result = await res.json();
            dispatch(getMessageActionCreator(result))
        }
        else {
            let result = await res.json();
            let {token, userId} = result;
            localStorage.setItem('token', token);
            history.push(`users/${userId}`);
        }
    }
};

export const getUserThunk = (id: any, history: any) => async (dispatch: any) => {
    dispatch(fetchingCurrentUserActionCreator());
    let response = await service.getCurrentUser(id);
    if (response.status > 400) {
        if (response.status === 401) {
            let result = await response.json();
            dispatch(getMessageActionCreator(result));
            history.push('/auth')
        }
    }
    else {
        let {user, token} = await response.json();
        if (token) {
            localStorage.setItem('token', token)
        }
        dispatch(getCurrentUserActionCreator(user))
    }
};

export const getUsersThunk = (params: any, counter: any, history: any) => async (dispatch: any) => {
    dispatch(fetchingUsersActionCreator());
    let response = await service.getUsers(params);
    if (response.status > 400) {
        if (response.status === 401) {
            let result = await response.json();
            dispatch(getMessageActionCreator(result));
            history.push('/auth')
        }
    }
    else {
        let {users, usersLength, token} = await response.json();
        if (token) {
            localStorage.setItem('token', token)
        }
        let hasMore = counter + users.length !== usersLength;
        dispatch(getUsersActionCreator(users, hasMore))
    }
};