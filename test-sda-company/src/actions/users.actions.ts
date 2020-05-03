import {Service} from "../service";
import {getMessageActionCreator} from "./messages.actions";
import {
    APIUSerResponseType,
    ClearUsersActionType,
    CombineUsersTypes,
    FetchingCurrentUserActionType,
    FetchingUsersActionType,
    GetCurrentUserActionType,
    GetUsersActionType,
    HasMoreType,
    APILoginUserResponseType,
    RequestParamsType,
    UserListItemType,
    UserResponseType, APIUsersListResponseType
} from "../types";
import {RootStateType} from "../store/store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
import { History } from 'history';

let service = new Service();

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCHING_CURRENT_USER = 'FETCHING_CURRENT_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_USERS = 'GET_USERS';
export const CLEAR_USERS = 'CLEAR_USERS';

const fetchingUsersActionCreator = (): FetchingUsersActionType => ({type: FETCHING_USERS});

export const clearUsersActionCreator = (): ClearUsersActionType => ({type: CLEAR_USERS});

const fetchingCurrentUserActionCreator = (): FetchingCurrentUserActionType => ({type: FETCHING_CURRENT_USER});

const getCurrentUserActionCreator = (user: UserResponseType): GetCurrentUserActionType => {
    return {
        type: GET_CURRENT_USER,
        payload: user
    }
};

const getUsersActionCreator = (users: Array<UserListItemType>, hasMore: HasMoreType): GetUsersActionType => {
    return {
        type: GET_USERS,
        users,
        hasMore
    }
};

export type ThunkUserType = ThunkAction<void, RootStateType, unknown, CombineUsersTypes>
export type DispatchUserType = Dispatch<CombineUsersTypes>;

export const loginUserThunk = (email: string, history: History):ThunkUserType  => async (dispatch: DispatchUserType) => {
    if (email.trim() !== '') {
        let service = new Service();
        let res = await service.loginUser(email);
        if (res.status > 400) {
            let result = await res.json();
            dispatch(getMessageActionCreator(result))
        }
        else {
            let result = await res.json();
            let {token, userId}: APILoginUserResponseType = result;
            localStorage.setItem('token', token);
            history.push(`users/${userId}`);
        }
    }
};

export const getUserThunk = (id: string, history: History): ThunkUserType => async (dispatch: DispatchUserType) => {
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
        let {user, token}: APIUSerResponseType  = await response.json();
        if (token) {
            localStorage.setItem('token', token)
        }
        dispatch(getCurrentUserActionCreator(user))
    }
};

export const getUsersThunk = (params: RequestParamsType, counter: number, history: History): ThunkUserType => async (dispatch: DispatchUserType) => {
    dispatch(fetchingUsersActionCreator());
    let response = await service.getUsers(params);
    if (!response) return;
    if (response.status > 400) {
        if (response.status === 401) {
            let result = await response.json();
            dispatch(getMessageActionCreator(result));
            history.push('/auth');
        }
    }
    else {
        let {users, usersLength, token}: APIUsersListResponseType = await response.json();
        if (token) {
            localStorage.setItem('token', token)
        }
        let hasMore = counter + users.length !== usersLength;
        dispatch(getUsersActionCreator(users, hasMore))
    }
};