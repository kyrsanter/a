import {
    ClearUsersActionType,
    FetchingCurrentUserActionType,
    FetchingUsersActionType,
    GetCurrentUserActionType, GetUsersActionType,
    UserListItemType,
    UserResponseType
} from "../types";
import {
    CLEAR_USERS,
    FETCHING_CURRENT_USER,
    FETCHING_USERS,
    GET_CURRENT_USER,
    GET_USERS
} from "../actions/users.actions";

let userState = {
    users: [] as [] | Array<UserListItemType>,
    currentUser: null as null | UserResponseType,
    fetchingUsers: false,
    fetchingCurrentUser: false,
    limit: 6,
    skip: 0,
    hasMore: true
};

type UserStateType = typeof userState;
type CombineUserActionsType = FetchingCurrentUserActionType | FetchingUsersActionType | GetCurrentUserActionType | GetUsersActionType | ClearUsersActionType

export const userReducer = (state = userState, action: CombineUserActionsType): UserStateType => {
    switch (action.type) {
        case FETCHING_USERS:
            return {
                ...state,
                fetchingUsers: true
            };
        case FETCHING_CURRENT_USER:
            return {
                ...state,
                fetchingCurrentUser: true
            };
        case GET_CURRENT_USER:
            return {
                ...state,
                fetchingCurrentUser: false,
                currentUser: action.payload
            };
        case GET_USERS:
            return {
                ...state,
                fetchingUsers: false,
                users: [...state.users, ...action.users],
                skip: state.limit,
                limit: state.limit + 6,
                hasMore: action.hasMore
            };
        case CLEAR_USERS:
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
