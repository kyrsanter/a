import {UserAddressType, UserCompanyType} from "../../../types";

export type PropsType = {
    title: string
    data: UserAddressType | UserCompanyType
}