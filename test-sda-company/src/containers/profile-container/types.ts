import {PostType, RequestParamsType, UserResponseType} from "../../types";
import {History} from 'history'

export type ParentPropsType = {
    id: string
}

export type StatePropsType =  {
    hasMore: boolean
    limit: number
    skip: number
    userPosts: null | Array<PostType>
    fetchingPosts: boolean
    fetchingCurrentUser: boolean
    currentUser: null | UserResponseType
};

export type DispatchPropsType = {
    clearUserPosts: () => void,
    getUSerPosts: (params: RequestParamsType, path: string, postsLength: number, history: History) => void
    getCurrentUser: (id: string, history: History) => void
}

export type PropsType = StatePropsType & DispatchPropsType & ParentPropsType;