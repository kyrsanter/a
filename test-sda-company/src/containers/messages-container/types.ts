import {MessageType} from "../../types";

export type StatePropsType = {
    messages: Array<MessageType>
    hasMessage: boolean
}

export type DispatchPropsType = {
    clearMessages: () => void
}

export type PropsType = StatePropsType & DispatchPropsType;
