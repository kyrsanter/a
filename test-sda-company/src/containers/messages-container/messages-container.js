import React, {useEffect} from "react";
import {connect} from 'react-redux';
import Message from "../../components/message/message";
import {clearMessagesActionCreator} from "../../actions/messages.actions";

const MessageContainer = (props) => {
    let {messages, hasMessage, clearMessages} = props;

    useEffect(() => {
        let timeout = setTimeout(() => {
            clearMessages()
        }, 2500);
        return () => clearTimeout(timeout)
    }, [hasMessage]);

    return <Message messages={messages} hasMessage={hasMessage}/>
};

let mapStateToProps = (state) => {
    return {
        messages: state.message.messages,
        hasMessage: state.message.hasMessage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        clearMessages: () => dispatch(clearMessagesActionCreator())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);