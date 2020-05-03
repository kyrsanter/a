import React, {FC, useEffect} from "react";
import {connect} from 'react-redux';
import Message from "../../components/message/message";
import {clearMessagesActionCreator} from "../../actions/messages.actions";
import {RootStateType} from "../../store/store";
import {MessageType} from "../../types";
import {DispatchPropsType, PropsType, StatePropsType} from "./types";

const MessageContainer: FC<PropsType> = (props) => {
    let {messages, hasMessage, clearMessages} = props;

    useEffect(() => {
        let timeout = setTimeout(() => {
            clearMessages()
        }, 2500);
        return () => clearTimeout(timeout)
    }, [hasMessage]);

    return <Message messages={messages} hasMessage={hasMessage}/>
};

let mapStateToProps = (state: RootStateType) => {
    return {
        messages: state.message.messages,
        hasMessage: state.message.hasMessage
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        clearMessages: () => dispatch(clearMessagesActionCreator())
    }
};

export default connect<StatePropsType, DispatchPropsType, {}, RootStateType>(mapStateToProps, mapDispatchToProps)(MessageContainer);