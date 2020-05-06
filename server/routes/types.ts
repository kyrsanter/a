export type UsersParams = {
    limit: string
    skip: string
    token?: string
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
