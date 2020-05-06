import {UserResponseType} from "../types";

export type LoginUserResponseType = {
    token: string,
    userId: string
}

export type CurrentUSerResponseType = {
    user: UserResponseType & {admin: boolean},
    token: string | undefined
}

export type ParamsTypes = {
    postsParams: {
        id: string
        limit: string
        skip: string
        all: boolean
        canBeModify: boolean
        token?: string
    }
}

export type PostType = {
    id: string,
    userId: string,
    canBeModify: boolean,
    title: string,
    body: string
    authorName?: string
}

export type PostsResponseType = {
    posts: Array<PostType>
    postsLength: number
    token?: string
}