import {GetMessageActionCreatorType, ClearMessageActionCreatorType} from "../actions/messages.actions";

type MessageType = {
    err: string
}

let messagesState = {
    messages: [] as [] | Array<MessageType>,
    hasMessage: false
};

type MessgeStateType = typeof messagesState;
type MessageActionType = GetMessageActionCreatorType | ClearMessageActionCreatorType;

export const messagesReducer = (state:MessgeStateType = messagesState, action: MessageActionType):MessgeStateType => {
    switch (action.type) {
        case 'GET_MESSAGE':
            return {
              ...state,
              messages: [action.payload],
              hasMessage: true,
            };
        case 'CLEAR_MESSAGES':
            return {
                ...state,
                messages: [],
                hasMessage: false
            };
        default:
            return state;
    }
};