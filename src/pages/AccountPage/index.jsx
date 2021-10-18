import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { CgArrowLeft } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { DisplayingUpdateProfileErrorMessagesSchema } from "../../utils/validationSchema";
import { getRealTimeUsers } from '../../features/users/user.actions';
import { getAuthenticatedUserData } from "../../features/users/selectors";
import API from "../../API";
import { update } from "../../features/auth/auth.actions";

const AccountPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const authenticatedUsers = useSelector(getAuthenticatedUserData);
    const user = authenticatedUsers[0];
    const dispatch = useDispatch();

    const onFileSubmit = async (e) => {
        e.preventDefault();
        await API.updateUsersAvatar(fileUrl, user)
        setSelectedFile(null);
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const newFileUrl = await API.updateFile(file);
        
        setFileUrl(newFileUrl);
        setSelectedFile(file);
    }

    const userUpdate = ({ firstName, lastName, email, password }) => {
        dispatch(update(user, firstName, lastName, email, password))
    }

    useEffect(() => {
        dispatch(getRealTimeUsers(user.uid))
    }, [authenticatedUsers[0].avatar, authenticatedUsers[0].firstName]);


    return (
        <div className={styles.UserDataContainer}>
            <div className={styles.InputChangeContainer}>
                <Link exact to="/"><button className={styles.Link}><CgArrowLeft className={styles.IconArrow} /> Back to Chat</button> </Link>
                <div className={styles.UserAvatarEdit}>

                    {user.avatar !== ""
                        ? <img className={styles.UserDisplayImage} src={user.avatar} alt="" />  //alt={user.firstName}

                        : <div className={styles.UserDisplayAvatar}>
                            <p>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</p>
                        </div>
                    }

                    <form onSubmit={onFileSubmit} className={styles.ImageSubmitForm} >
                        <label className={styles.CustomFileUpload}>
                            <input type="file" onChange={onFileChange} />
                            <FaUserEdit className={styles.UserEditIcon} />
                        </label>
                        {selectedFile ? <button className={styles.ImageUploadButton}>Submit</button> : null}

                    </form>

                </div>
                <div className={styles.UserData}>
                    <h4>User first name: <span>{`  ${user.firstName}`} </span> </h4>
                    <h4>User last name: <span> {`  ${user.lastName}`}</span> </h4>
                    <h4>Email:<span>  {`  ${user.email}`}</span></h4>
                    <h4>Password: <span> {`  ${user.password}`}</span></h4>
                </div>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: ""
                    }}
                    validationSchema={DisplayingUpdateProfileErrorMessagesSchema}
                    onSubmit={(data, { resetForm }) => {userUpdate(data); resetForm()}}
                >
                    {({ errors, touched }) => (
                        <Form className={styles.Form}>
                            <Field
                                className={styles.Input}
                                name="firstName"
                                placeholder="Change first name"
                                type="text"
                            />
                            {touched.firstName && errors.firstName && <div className={styles.ErrorContainer}>{errors.firstName}</div>}

                            <Field
                                className={styles.Input}
                                name="lastName"
                                placeholder="Change last name"
                                type="text"
                            />
                            {touched.lastName && errors.lastName && <div className={styles.ErrorContainer}>{errors.lastName}</div>}

                            <Field
                                className={styles.Input}
                                name="email"
                                placeholder="Change email"
                                type="text"
                            />
                            {touched.email && errors.email && <div className={styles.ErrorContainer}>{errors.email}</div>}

                            <Field
                                className={styles.Input}
                                name="password"
                                placeholder="Change password"
                                type="password"
                            />
                            {touched.password && errors.password && <div className={styles.ErrorContainer}>{errors.password}</div>}

                            <button className={styles.Button} type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AccountPage;
