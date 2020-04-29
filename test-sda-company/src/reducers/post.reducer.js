let postsState = {
    userPosts: {
        loading: false,
        posts: [],
        limit: 6,
        skip: 0,
        hasMore: true,
    },
    allPosts: {
        loading: false,
        posts: [],
        limit: 6,
        skip: 0,
        hasMore: true,
    }
};


export const postReducer = (state = postsState, action) => {
    switch (action.type) {
        case 'FETCHING_ALL_POSTS':
            return {
                ...state,
                allPosts: {
                    ...state.allPosts,
                    loading: true
                }
            };
        case 'FETCHING_USER_POSTS':
            return {
                ...state,
                userPosts: {
                    ...state.userPosts,
                    loading: true
                }
            };
        case 'GET_USER_POSTS':
            return {
                ...state,
                userPosts: {
                    loading: false,
                    posts: [...state.userPosts.posts, ...action.posts],
                    skip: state.userPosts.limit,
                    limit: state.userPosts.limit + 6,
                    hasMore: action.hasMore
                }
            };
        case 'GET_ALL_POSTS':
            return {
                ...state,
                allPosts: {
                    loading: false,
                    posts: [...state.allPosts.posts, ...action.posts],
                    skip: state.allPosts.limit,
                    limit: state.allPosts.limit + 6,
                    hasMore: action.hasMore
                }
            };
        case 'CLEAR_USER_POSTS':
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
        case 'CLEAR_ALL_POSTS':
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