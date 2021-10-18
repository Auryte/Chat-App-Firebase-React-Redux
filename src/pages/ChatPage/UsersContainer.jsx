import React, { useState } from 'react';
import User from "./User";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersData } from "../../features/users/selectors";
import styles from "./styles.module.css";
import { getRealTimeConversations } from '../../features/users/user.actions';
import MessagesContainer from './MessagesContainer';

const UsersContainer = ({ user} ) => { 
    const users = useSelector(getAllUsersData);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState("");
    const dispatch = useDispatch();

    const initChat = (otherUser) => {
        setChatStarted(true);
        setChatUser(otherUser);
        dispatch(getRealTimeConversations({uid_1: user.uid, uid_2: otherUser.uid})) //[user.uid, otherUser.uid]
    }

    return (
        <>
            <div className={styles.UsersContainerSection}>
                <div className={styles.UsersContainer}>
                    {
                        users.length > 0 ?
                            users.map(user => {
                                return (
                                    <User
                                        key={user.uid}
                                        user={user}
                                        onClick={initChat}
                                    />
                                );
                            }) : null
                    }
                </div>
            </div>
            {chatStarted ? <MessagesContainer auth={user} chatUser={chatUser} users={users} /> : null}
        </>
    )
}

export default UsersContainer;
