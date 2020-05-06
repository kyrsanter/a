import {UserResponseType} from "../types";

export type DataType = {
    id: string
    admin: boolean,
    loggedIn: boolean,
    token: string | undefined
}

export type UsersParams = {
    limit: string
    skip: string
    token?: string
}

export type AuthRequestType = {
    data?: DataType
    usersParams?: UsersParams
}

export type MappedUserList = {
    name: string
    phone: string
    email: string
    id: string
    username: string
}

export type UsersResponse = {
    users: Array<MappedUserList>
    usersLength: number
    token: string
}
