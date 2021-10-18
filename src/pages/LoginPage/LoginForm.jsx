import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/auth.actions";
import styles from "./styles.module.css";
import { getUserLoggedIn, getAuthLoginErr } from "../../features/auth/selectors";
import { DisplayingLoginErrorMessagesSchema } from "../../utils/validationSchema";
import { deleteAuthErr } from "../../features/auth/auth.actions";
import Popup from "../../components/Popup";

const LoginForm = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(getUserLoggedIn);
    const error = useSelector(getAuthLoginErr);

    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const handlePopupClose = () => setPopupIsOpen(false);
    
    useEffect(() => {
       setPopupIsOpen(!!error)
    }, [error])

    const userLogin = ({ email, password }) => {
        dispatch(login({ email, password }))
    }

    useEffect(() => {
        return () => {
            dispatch(deleteAuthErr);
        }
    }, []);

    if (loggedIn) {
        return <Redirect to="/" />
    }

    return (
        <div className={styles.MainContainer}>
            <div className={styles.InputContainer}>
                <h1>CONNECT</h1>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={DisplayingLoginErrorMessagesSchema}
                    onSubmit={userLogin}
                >
                    {({ errors, touched }) => (
                        <Form className={styles.Form}>

                            <Field
                                name="email"
                                placeholder="Enter email"
                                type="text"
                            />
                            {touched.email && errors.email && <div className={styles.ErrorContainer}>{errors.email}</div>}

                            <Field
                                name="password"
                                placeholder="Enter password"
                                type="password"
                            />
                            {touched.password && errors.password && <div className={styles.ErrorContainer}>{errors.password}</div>}
                            <button className={styles.Button} type="submit">Login</button>
                           
                        </Form>
                    )}
                </Formik>
                {
                    error && popupIsOpen && <Popup
                        content={<>
                            <h4 className="PopupContentTitle">Error:</h4>
                            <div className="PopupContainer">
                                <div className="PopupUserContainer">
                                    {error.message}
                                </div>

                            </div>
                        </>}

                        handleClose={handlePopupClose}
                    />
                }
                <div className={styles.LinkContainer}> New here? Please,</div>
                <div > <Link className={styles.Link} exact to="/register">  Register</Link></div>
            </div>
        </div >

    )
}

export default LoginForm;
