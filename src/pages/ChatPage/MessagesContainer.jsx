import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from '../../features/users/user.actions';
import { getChatMessages } from "../../features/users/selectors"
import styles from "./styles.module.css";
import SendMessageContainer from './SendMessageContainer';


function createUserInitials(user) {
    return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()
}

const MessagesContainer = ({ auth: authenticatedUser, chatUser, users }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const msgContainerRef = useRef(null);
    const conversations = useSelector(getChatMessages);

    // ComponentDidMount
    useEffect(() => {
        msgContainerRef.current.scrollIntoView();
    }, []);

    // ComponentDidUpdate (users)
    useEffect(() => {
        msgContainerRef.current.scrollIntoView();
    }, [conversations]);

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        const msgObj = {
            user_uid_1: authenticatedUser.uid,
            user_uid_2: chatUser.uid,
            message
        }
        const emptyRegex = /^( +)+$/;
        const isEmpty = (value) => emptyRegex.test(value);

        if (message !== "" && !isEmpty(message)) {
            dispatch(updateMessage(msgObj))
        }
        setMessage("");
    }


    return (
        <div className={styles.ChatMessagesSection}>

            <div className={styles.ChatHeader}>
                <p> {`${chatUser.firstName} ${chatUser.lastName}`} </p>
            </div>

            <div className={styles.ChatMessagesAll}>
                <div className={styles.fix}></div>

                {conversations.reverse().map((con) => (
                    <div key={con.id} className={con.user_uid_1 === authenticatedUser.uid ? styles.ChatMessageRight : styles.ChatMessageLeft}>

                        {con.user_uid_1 === chatUser.uid
                            ? chatUser.avatar !== ""
                                ? <img className={styles.messageAvatar} src={con.user_uid_1 === authenticatedUser.uid
                                    ? authenticatedUser.avatar
                                    : chatUser.avatar
                                }
                                    alt="" />
                                : con.user_uid_1 === chatUser.uid
                                    ? <div className={styles.messageAvatar}><p>{createUserInitials(chatUser)}</p></div>
                                    : <div className={styles.messageAvatar}><p>{createUserInitials(authenticatedUser)}</p></div>
                            : null
                        }

                        <p className={con.user_uid_1 === authenticatedUser.uid ? styles.ChatMessageBlue : styles.ChatMessageGrey}> {con.message}</p>

                        {con.user_uid_1 === authenticatedUser.uid
                            ? authenticatedUser.avatar !== ""
                                ? <img className={styles.messageAvatar} src={con.user_uid_1 === authenticatedUser.uid
                                    ? authenticatedUser.avatar
                                    : chatUser.avatar
                                }
                                    alt="" />
                                : con.user_uid_1 === authenticatedUser.uid
                                    ? <div className={styles.messageAvatar}><p>{createUserInitials(authenticatedUser)}</p></div>
                                    : <div className={styles.messageAvatar}><p>{createUserInitials(chatUser)}</p></div>
                            : null
                        }
                        
                    </div>

                ))}
                <div ref={msgContainerRef}></div>
            </div>

            <div className={styles.SendMsgContainer}>
                <SendMessageContainer
                    onSubmit={handleSubmitMessage}
                    message={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
        </div>
    )
}

export default MessagesContainer;
