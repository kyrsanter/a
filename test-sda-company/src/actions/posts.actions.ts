import {Service} from "../service";
import {getMessageActionCreator} from "./messages.actions";
import {
    APIPostsResponseType,
    ClearAllPostsType,
    ClearUserPostsType,
    FetchingAllPostsType,
    FetchingUsersPostsType,
    GetAllPostsPostsType, GetMessageActionType, GetUserPostsType, HasMoreType,
    PostType, RequestParamsType
} from "../types";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../store/store";
import {Dispatch} from "redux";
import {History} from 'history'

let service = new Service();

export const FETCHING_USER_POSTS = 'FETCHING_USER_POSTS';
export const FETCHING_ALL_POSTS = 'FETCHING_ALL_POSTS';
export const GET_USER_POSTS = 'GET_USER_POSTS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const CLEAR_USER_POSTS = 'CLEAR_USER_POSTS';
export const CLEAR_ALL_POSTS = 'CLEAR_ALL_POSTS';


const fethingUserPostsActionCreator = ():FetchingUsersPostsType => {
    return {
        type: FETCHING_USER_POSTS
    }
};

const fethingAllPostsActionCreator = ():FetchingAllPostsType => {
    return {
        type: FETCHING_ALL_POSTS
    }
};

const getUserPostsActionCreator = (userPosts: Array<PostType>, hasMoreUserPosts: HasMoreType):GetUserPostsType => {
    return {
        type: GET_USER_POSTS,
        userPosts,
        hasMoreUserPosts
    }
};

const getAllPostsActionCreator = (allPosts: Array<PostType>, hasMoreAllPosts:boolean):GetAllPostsPostsType => {
    return {
        type: GET_ALL_POSTS,
        allPosts,
        hasMoreAllPosts
    }
};

export const clearUserPosts = ():ClearUserPostsType => {
    return {
        type: CLEAR_USER_POSTS
    }
};

export const clearAllPosts = ():ClearAllPostsType => {
    return {
        type: CLEAR_ALL_POSTS
    }
};

type CombineUserActionsTypes = GetUserPostsType | FetchingUsersPostsType | FetchingAllPostsType | GetAllPostsPostsType | GetMessageActionType;

type UserThunkType = ThunkAction<void, RootStateType, unknown, CombineUserActionsTypes>
type UserDispatchType = Dispatch<CombineUserActionsTypes>

export const getUsersPostsThunk = (params: RequestParamsType, path: string, statePostLength: number, history:History):UserThunkType => async (dispatch: UserDispatchType) => {
    dispatch(fethingUserPostsActionCreator());
    let response = await service.getUserPosts(params, path);
    if (!response) return;
    if (response.status > 400) {
        if (response.status === 401) {
            let result = await response.json();
            dispatch(getMessageActionCreator(result));
            history.push('/auth')
        }
    }
    else {
        let {posts: userPosts, postsLength, token}: APIPostsResponseType = await response.json();
        if (token) {
            localStorage.setItem('token', token)
        }
        let hasMore = statePostLength + userPosts.length !== postsLength;
        dispatch(getUserPostsActionCreator(userPosts, hasMore)) // posts for users page
    }
};

export const getAllPostsThunk = (params: RequestParamsType, path: null | string, statePostLength: number, history:History):UserThunkType => async (dispatch:UserDispatchType) => {
    dispatch(fethingAllPostsActionCreator());
    let response = await service.getAllPosts(params, path);
    if (!response) return;
    if (response.status > 400) {
        if (response.status === 401) {
            let result = await response.json();
            dispatch(getMessageActionCreator(result));
            history.push('/auth')
        }
    }
    else {
        let {posts: allPosts, postsLength, token}: APIPostsResponseType = await response.json();
        if (token) {
            localStorage.setItem('token', token)
        }
        let hasMore = statePostLength + allPosts.length !== postsLength;
        dispatch(getAllPostsActionCreator(allPosts, hasMore)) // posts for all posts page
    }
}
