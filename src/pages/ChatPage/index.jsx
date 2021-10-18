import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUserLoggedIn } from "../../features/auth/selectors";
import { getAuthenticatedUserData } from "../../features/users/selectors"
import styles from "./styles.module.css";
import { getRealTimeUsers } from '../../features/users/user.actions';
import ChatPageHeader from './ChatPageHeader';
import UsersContainer from './UsersContainer';

const ChatPage = ({ user }) => {
    const loggedIn = useSelector(getUserLoggedIn);
    const dispatch = useDispatch();
    const authenticatedUserData = useSelector(getAuthenticatedUserData);
   
    useEffect(() => {
        const unsubscribe = dispatch(getRealTimeUsers(user.uid))
            .then(unsubscribe => {
                return unsubscribe
            })
            .catch(error => {
                console.log(error)
            })
        return () => {
            //cleanup
            unsubscribe.then(f => f()).catch(error => console.log(error))
        }
    }, []);


    return (
        <div className={styles.ChatPageContainerMain}>

            {loggedIn ? <ChatPageHeader user={authenticatedUserData[0]} /> : null}

            <section className={styles.ChatContainerSection}>
                {
                    authenticatedUserData
                        ? <UsersContainer user={authenticatedUserData[0]} />
                        : null
                }
            </section>

        </div >
    )
}

export default ChatPage;


