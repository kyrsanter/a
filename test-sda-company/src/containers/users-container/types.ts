import {RequestParamsType, UserListItemType} from "../../types";

export type StatePropsType = {
    limit: number
    skip: number
    users: [] | Array<UserListItemType>
    fetchingUsers: boolean
    hasMore: boolean
}


export type DispatchPropsType = {
    getUsers: (params: RequestParamsType, counter: number, history: any) => void
    clearUsers: () => void
}

export type PropsType = StatePropsType & DispatchPropsType;