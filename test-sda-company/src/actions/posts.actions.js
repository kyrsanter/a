import {Service} from "../service";
import {getMessageActionCreator} from "./messages.actions";

let service = new Service();

const FETCHING_USER_POSTS = 'FETCHING_USER_POSTS';
const FETCHING_ALL_POSTS = 'FETCHING_ALL_POSTS';
const GET_USER_POSTS = 'GET_USER_POSTS';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const CLEAR_USER_POSTS = 'CLEAR_USER_POSTS';
const CLEAR_ALL_POSTS = 'CLEAR_ALL_POSTS';


const fethingUserPostsActionCreator = () => {
    return {
        type: FETCHING_USER_POSTS
    }
};

const fethingAllPostsActionCreator = () => {
    return {
        type: FETCHING_ALL_POSTS
    }
};

const getUserPostsActionCreator = (posts, hasMore) => {
    return {
        type: GET_USER_POSTS,
        posts,
        hasMore
    }
};

const getAllPostsActionCreator = (posts, hasMore) => {
    return {
        type: GET_ALL_POSTS,
        posts,
        hasMore
    }
};

export const clearUserPosts = () => {
    return {
        type: CLEAR_USER_POSTS
    }
};

export const clearAllPosts = () => {
    return {
        type: CLEAR_ALL_POSTS
    }
};


export const getPostsThunk = (params, path, statePostLength, history) => async (dispatch) => {
    if (path) {
        dispatch(fethingUserPostsActionCreator());
    }
    else {
        dispatch(fethingAllPostsActionCreator());
    }
    let response = await service.getPosts(params, path);
    if (response.status > 400) {
        if (response.status === 401) {
            let result = await response.json();
            dispatch(getMessageActionCreator(result));
            history.push('/auth')
        }
    }
    else {
        let {posts, postsLength, token} = await response.json();
        if (token) {
            localStorage.setItem('token', token)
        }
        let hasMore = statePostLength + posts.length !== postsLength;
        if (path) {
                dispatch(getUserPostsActionCreator(posts, hasMore)) // posts for users page
            }
            else {
                dispatch(getAllPostsActionCreator(posts, hasMore)) // posts for all posts page
            }
        }
};
