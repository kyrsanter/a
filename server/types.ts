export type ErrorMessageType = {
    err: string
}

export type RequestUsersParams = {
    usersParams: {
        limit: string
        skip: string
        token: string
    }
}

export type UserAddressType = {
    city: string,
    geo: {
        lat: string,
        lng: string
    }
    street: string
    suite: string
    zipcode: string
}
export type UserCompanyType = {
    bs: string
    catchPhrase: string
    name: string
}
export type UserResponseType = {
    email: string
    id: string
    name: string
    phone: string
    username: string
    website: string
    admin: boolean
    address: UserAddressType
    company: UserCompanyType
}