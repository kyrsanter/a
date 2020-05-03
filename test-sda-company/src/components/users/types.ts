import {UserListItemType} from "../../types";

export type PropsType = {
    users: [] | Array<UserListItemType>
    loading: boolean
    loadMore: () => void
}
