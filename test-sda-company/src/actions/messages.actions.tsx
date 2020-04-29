const GET_MESSAGE = 'GET_MESSAGE';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';


export type GetMessageActionCreatorType = ReturnType<typeof getMessageActionCreator>
export type ClearMessageActionCreatorType = ReturnType<typeof clearMessagesActionCreator>

export const getMessageActionCreator = (msg: any) => ({type: GET_MESSAGE, payload: msg} as const);
export const clearMessagesActionCreator = () => ({type: CLEAR_MESSAGES} as const);

