import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { DisplayingRegisterErrorMessagesSchema } from "../../utils/validationSchema";
import { register } from "../../features/auth/auth.actions";
import { getUserLoggedIn, getAuthLoginErr } from "../../features/auth/selectors";
import { deleteAuthErr } from "../../features/auth/auth.actions";
import Popup from "../../components/Popup";
import "../../components/Popup.css";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(getUserLoggedIn);
    const error = useSelector(getAuthLoginErr);

    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const handlePopupClose = () => setPopupIsOpen(false);

    useEffect(() => {
        setPopupIsOpen(Boolean(error))
    }, [error]);

    useEffect(() => {
        return () => {
            dispatch(deleteAuthErr);
        }
    }, []);

    if (loggedIn) {
        return <Redirect to="/" />
    }

    const registerUser = (user) => {
        dispatch(register(user));
    }

    return (
        <div className={styles.MainContainer}>
            <div className={styles.InputContainer}>
                <h1>CONNECT</h1>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: ""
                    }}
                    validationSchema={DisplayingRegisterErrorMessagesSchema}
                    onSubmit={registerUser}
                >
                    {({ errors, touched }) => {

                        return (
                            <Form className={styles.Form}>
                                <Field
                                    name="firstName"
                                    placeholder="First name"
                                    type="text"
                                />
                                {touched.firstName && errors.firstName && <div className={styles.ErrorContainer}>{errors.firstName}</div>}
                                <Field
                                    name="lastName"
                                    placeholder="Last name"
                                    type="text"
                                />
                                {touched.lastName && errors.lastName && <div className={styles.ErrorContainer}>{errors.lastName}</div>}

                                <Field
                                    name="email"
                                    placeholder="Email"
                                    type="text"
                                />
                                {touched.email && errors.email && <div className={styles.ErrorContainer}>{errors.email}</div>}

                                <Field
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                />
                                {touched.password && errors.password && <div className={styles.ErrorContainer}>{errors.password}</div>}
                                <button className={styles.Button} type="submit">Register</button>
                               
                            </Form>
                        )
                    }}
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
                <div className={styles.LinkContainer}> Already have an account? Please,</div>
                <div > <Link className={styles.Link} exact to="/login">  Login</Link></div>
            </div>
        </div >

    )
}

export default RegisterForm;
