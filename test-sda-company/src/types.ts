import {
    CLEAR_ALL_POSTS,
    CLEAR_USER_POSTS,
    FETCHING_ALL_POSTS,
    FETCHING_USER_POSTS,
    GET_ALL_POSTS, GET_USER_POSTS
} from "./actions/posts.actions";
import {CLEAR_MESSAGES, GET_MESSAGE} from "./actions/messages.actions";
import {CLEAR_USERS, FETCHING_CURRENT_USER, FETCHING_USERS, GET_CURRENT_USER, GET_USERS} from "./actions/users.actions";

export type JWTDecodeType  = {
    userId: number
    iss: string
    sub: string
    aud: string
    iat: number
}


export type MessageType = {
    err: string,
}
export type UserAddressType = {
    city: string,
    geo: {
        lat: string,
        lng: string
    }
    street: string
    suite: string
    zipcode: string
}
export type UserCompanyType = {
    bs: string
    catchPhrase: string
    name: string
}
export type RequestParamsType = {
    id?: string,
    skip: number,
    limit: number,
    signal?: AbortSignal
}
export type PostType = {
    id: number,
    userId: number,
    canBeModify: boolean,
    title: string,
    body: string
    authorName?: string
}
export type HasMoreType = boolean;
export type UserResponseType = {
    email: string
    id: number
    name: string
    phone: string
    username: string
    website: string
    admin: boolean
    address: UserAddressType
    company: UserCompanyType
}
export type UserListItemType = {
    email: string
    id: number
    name: string
    phone: string
    username: string
}

/*POSTS ACTION TYPES*/
export type FetchingUsersPostsType = {type: typeof FETCHING_USER_POSTS };
export type FetchingAllPostsType = {type: typeof FETCHING_ALL_POSTS };
export type GetUserPostsType = {
    type: typeof GET_USER_POSTS,
    userPosts: Array<PostType>,
    hasMoreUserPosts: HasMoreType
};
export type GetAllPostsPostsType = {
    type: typeof GET_ALL_POSTS,
    allPosts: Array<PostType>,
    hasMoreAllPosts: HasMoreType
};
export type ClearUserPostsType = {type: typeof CLEAR_USER_POSTS}
export type ClearAllPostsType = {type: typeof CLEAR_ALL_POSTS}

/*MESSAGE ACTION TYPES*/
export type GetMessageActionType = {
    type: typeof GET_MESSAGE,
    payload: MessageType
};
export type ClearMessageActionType = {type: typeof CLEAR_MESSAGES};

/*USERS AND USER ACTION TYPES*/
export type FetchingUsersActionType = {type: typeof FETCHING_USERS};
export type ClearUsersActionType = {type: typeof CLEAR_USERS};
export type GetCurrentUserActionType = {
    type: typeof GET_CURRENT_USER
    payload: UserResponseType
};
export type FetchingCurrentUserActionType = {
    type: typeof FETCHING_CURRENT_USER
}
export type GetUsersActionType = {
    type: typeof GET_USERS,
    users: Array<UserListItemType>,
    hasMore: HasMoreType
}
export type CombineUsersTypes = FetchingUsersActionType | ClearUsersActionType | GetCurrentUserActionType | FetchingCurrentUserActionType | GetUsersActionType | GetMessageActionType

/*FOR INFINITE SCROLL TYPES*/

export type _AllTypes = typeof HTMLDivElement & {
    observe: (node: HTMLDivElement) => void
    disconnect: () => void
} | IntersectionObserver


/*============API====================*/

export type APIPostsResponseType = {
    posts: Array<PostType>
    postsLength: number
    token: string
}
export type APILoginUserResponseType = {
    token: string
    userId: number
}
export type APIUSerResponseType = {
    user: UserResponseType
    token: string
}
export type APIUsersListResponseType = {
    users: Array<UserListItemType>
    usersLength: number
    token: string
}