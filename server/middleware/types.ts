import {UsersParams} from "../routes/types";

export type TokenPayloadType = {
    userId: string
}

export type GeneratorTokenReturn = {
    newToken: string,
    id: string
}

export type VerifyCallBackType = {name: string, message: string, expiredAt: string};
export type DecodedCallBackType = {userId: string}


export type GeneratorTokenType = (obj: TokenPayloadType, secret: string | undefined, time: string | undefined) => GeneratorTokenReturn

/* ==== request middlewares types  */


export type DataType = {
    id: string
    admin: boolean,
    adminId?: string
    loggedIn: boolean,
    token: string | undefined
}

export type RequestJWTDataType = {
    data: {
        id?: string,
        adminId?: string
        admin: boolean,
        loggedIn: boolean,
        token?: string
    }
}

export type ParamsTypes = {
    postsParams: {
        id: string
        limit: string
        skip: string
        all: boolean
        adminId?: string
        canBeModify: boolean
        token?: string
    }
}

export type AuthRequestType = {
    data?: DataType
    usersParams?: UsersParams
}