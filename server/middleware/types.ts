export type TokenPayloadType = {
    userId: string
}

export type GeneratorTokenReturn = {
    newToken: string,
    id: string
}

export type VerifyCallBackType = {name: string, message: string, expiredAt: string};
export type DecodedCallBackType = {userId: string}

export type RequestJWTDataType = {
    data: {
        id: string,
        admin: boolean,
        loggedIn: boolean,
        token?: string
    }
}

export type GeneratorTokenType = (obj: TokenPayloadType, secret: string | undefined, time: string | undefined) => GeneratorTokenReturn