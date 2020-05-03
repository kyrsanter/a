import {ClearMessageActionType, GetMessageActionType, MessageType} from "../types";
import {CLEAR_MESSAGES, GET_MESSAGE} from "../actions/messages.actions";

let messagesState = {
    messages: [] as Array<MessageType>,
    hasMessage: false
};

type MessageStateType = typeof messagesState;
export type PostActionsType = GetMessageActionType | ClearMessageActionType

export const messagesReducer = (state:MessageStateType = messagesState, action: PostActionsType):MessageStateType => {
    switch (action.type) {
        case GET_MESSAGE:
            return {
              ...state,
              messages: [action.payload],
              hasMessage: true,
            };
        case CLEAR_MESSAGES:
            return {
                ...state,
                messages: [],
                hasMessage: false
            };
        default:
            return state;
    }
};