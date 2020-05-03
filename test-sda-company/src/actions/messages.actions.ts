import {ClearMessageActionType, GetMessageActionType, MessageType} from "../types";

export const GET_MESSAGE = 'GET_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export const getMessageActionCreator = (msg: MessageType): GetMessageActionType => {
    return {type: GET_MESSAGE, payload: msg};
};

export const clearMessagesActionCreator = (): ClearMessageActionType => {
    return {type: CLEAR_MESSAGES};
};
