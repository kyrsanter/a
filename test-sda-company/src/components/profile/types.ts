import {PostType, UserResponseType} from "../../types";

export type PropsType = {
    user: null | UserResponseType
    loading: boolean
    posts: null | Array<PostType>
    fetchingPosts: boolean
    loadMore: () => void
}