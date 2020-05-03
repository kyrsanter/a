import {PostType} from "../../../types";

export type PropsType = {
    posts: null | Array<PostType>
    loading: boolean
    loadMore: () => void
}