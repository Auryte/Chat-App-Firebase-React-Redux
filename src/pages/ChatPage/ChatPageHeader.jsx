import React from 'react';
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/auth.actions";

const ChatPageHeader = ({ user}) => {
    const dispatch = useDispatch();

    return (
        <header className={styles.ChatPageHeader}>
        <div className={styles.ChatPageHeaderGreeting}>
               { `Hi, ${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`}
        </div>
        <ul className={styles.menu}>
                    <div>
                        <Link exact to="/account" className={styles.ChatPageHeaderLogout}> Account </Link>
                        <Link to={'#'} onClick={() => {
                            dispatch(logout(user.uid))
                        }} className={styles.ChatPageHeaderLogout}>Logout</Link>
                    </div>

        </ul>
    </header>
    )
}

export default ChatPageHeader;
