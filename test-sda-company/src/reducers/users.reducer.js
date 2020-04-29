let userState = {
    users: [],
    currentUser: null,
    fetchingUsers: false,
    fetchingCurrentUser: false,
    limit: 6,
    skip: 0,
    hasMore: true
};

export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case 'FETCHING_USERS':
            return {
                ...state,
                fetchingUsers: true
            };
        case 'FETCHING_CURRENT_USER':
            return {
                ...state,
                fetchingCurrentUser: true
            };
        case 'GET_CURRENT_USER':
            return {
                ...state,
                fetchingCurrentUser: false,
                currentUser: action.payload
            };
        case 'GET_USERS':
            return {
                ...state,
                fetchingUsers: false,
                users: [...state.users, ...action.users],
                skip: state.limit,
                limit: state.limit + 6,
                hasMore: action.hasMore
            };
        case 'CLEAR_USERS':
            return {
                users: [],
                currentUser: null,
                fetchingUsers: false,
                fetchingCurrentUser: false,
                limit: 6,
                skip: 0,
                hasMore: true
            };
        default:
            return state;
    }
};
