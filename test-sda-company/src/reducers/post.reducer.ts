import store from "../store/store";
import {
    CLEAR_ALL_POSTS,
    CLEAR_USER_POSTS,
    FETCHING_ALL_POSTS, FETCHING_USER_POSTS,
    GET_ALL_POSTS,
    GET_USER_POSTS
} from "../actions/posts.actions";
import {
    ClearAllPostsType,
    ClearUserPostsType,
    FetchingAllPostsType,
    FetchingUsersPostsType,
    GetAllPostsPostsType,
    GetUserPostsType,
    PostType
} from "../types";

let postsState = {
    userPosts: {
        loading: false,
        posts: [] as [] | Array<PostType>,
        limit: 6,
        skip: 0,
        hasMore: true,
    },
    allPosts: {
        loading: false,
        posts: [] as [] | Array<PostType>,
        limit: 6,
        skip: 0,
        hasMore: true,
    }
};

type PostsStateType = typeof postsState;
type PostsActionType = FetchingAllPostsType | FetchingUsersPostsType | GetUserPostsType | GetAllPostsPostsType | ClearAllPostsType | ClearUserPostsType

export const postReducer = (state:PostsStateType = postsState, action: PostsActionType):PostsStateType => {
    switch (action.type) {
        case FETCHING_ALL_POSTS:
            return {
                ...state,
                allPosts: {
                    ...state.allPosts,
                    loading: true
                }
            };
        case FETCHING_USER_POSTS:
            return {
                ...state,
                userPosts: {
                    ...state.userPosts,
                    loading: true
                }
            };
        case GET_USER_POSTS:
            return {
                ...state,
                userPosts: {
                    loading: false,
                    posts: [...state.userPosts.posts, ...action.userPosts],
                    skip: state.userPosts.limit,
                    limit: state.userPosts.limit + 6,
                    hasMore: action.hasMoreUserPosts
                }
            };
        case GET_ALL_POSTS:
            return {
                ...state,
                allPosts: {
                    loading: false,
                    posts: [...state.allPosts.posts, ...action.allPosts],
                    skip: state.allPosts.limit,
                    limit: state.allPosts.limit + 6,
                    hasMore: action.hasMoreAllPosts
                }
            };
        case CLEAR_USER_POSTS:
            return {
                ...state,
                userPosts: {
                    loading: false,
                    posts: [],
                    skip: 0,
                    limit: 6,
                    hasMore: true
                }
            };
        case CLEAR_ALL_POSTS:
            return {
                ...state,
                allPosts: {
                    loading: false,
                    posts: [],
                    skip: 0,
                    limit: 6,
                    hasMore: true
                }
            };
        default:
            return state;
    }
};