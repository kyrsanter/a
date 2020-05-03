import React, {FC} from "react";
import styles from './message.module.css'
import {PropsType} from "./types";

const Message: FC<PropsType> = (props) => {
    let {messages, hasMessage} = props;
    let style = hasMessage ? styles.messageModal + ' ' + styles.active : styles.messageModal;
    return (
        <div className={style}>
            {
                hasMessage ? messages[0].err : null
            }
        </div>
    )
};

export default Message