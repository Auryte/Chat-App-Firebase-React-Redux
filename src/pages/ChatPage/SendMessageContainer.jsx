import React from 'react';
import styles from "./styles.module.css";
import { RiSendPlane2Fill } from "react-icons/ri";

const SendMessageContainer = ({onSubmit, message, onChange}) => {
    return (
             <form onSubmit={onSubmit}>
                    <input
                        placeholder="Aa"
                        type="text"
                        value={message}
                        onChange={onChange}
                    />

                    <button className={styles.MsgSendButton}> <RiSendPlane2Fill className={styles.Icon} /></button>

                </form>
    )
}

export default SendMessageContainer;
