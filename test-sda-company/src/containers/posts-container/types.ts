import {PostType, RequestParamsType} from "../../types";
import { History } from 'history';

export type StatePropsType = {
    limit: number
    skip: number
    allPosts: [] | Array<PostType>
    hasMore: boolean
    loading: boolean
}
export type DispatchPropsType = {
    clearAllPosts: () => void
    getAllPosts: (params: RequestParamsType, path: null, postsLength: number, history:History) => void
}
export type PropsType = StatePropsType & DispatchPropsType;