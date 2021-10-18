import React from 'react';
import LoginForm from './LoginForm';
import styles from "./styles.module.css";


const LoginPage = () => {
    return (
        <div className={styles.MainContainer}>
            <LoginForm />
        </div>
    )
}

export default LoginPage;
