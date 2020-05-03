import {History} from 'history'

export type DispatchType = {
    login: (email:string, history: History) => void
}