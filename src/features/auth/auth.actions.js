import {
    USER_REGISTER_SUCCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGIN,
    USER_LOGIN_SUCCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    AUTH_DELETE_ERR,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    USER_DATA_NOT_FOUND
} from './actionTypes';
import API from '../../API';

const formUserData = (createdUser, userData) => {
    return {
        firstName: userData.firstName,
        lastName: userData.lastName,
        uid: createdUser.user.uid,
        email: userData.email,
        password: userData.password,
        avatar: ""
    }
}
const handleError = (error, dispatch) => {
    dispatch({
        type: USER_LOGIN_FAILURE,
        payload: { error }
    });
    console.log("error:", error);
}

export const register = (userData) => async (dispatch) => {
    dispatch({ type: USER_LOGIN })
    try {
        const createdUser = await API.createUser(userData);
        console.log("createdUser", createdUser)
        await API.updateCurrentUser(createdUser, userData);
        await API.patchUserDB(createdUser, userData);
        const signedUpUser = formUserData(createdUser, userData);
        localStorage.setItem("user", JSON.stringify(signedUpUser))
        console.log("user signedup successfully ", signedUpUser);
        dispatch({
            type: USER_REGISTER_SUCCCESS,
            payload: { user: signedUpUser }
        });
    } catch (error) {
        console.dir(error);
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: { error }
        });

    }
}
//1. The email address is already in use by another account.
//2. A network error (such as timeout, interrupted connection or unreachable host) has occurred.

const formLoggedInUserData = (loggedInUser, userData) => {
    const name = loggedInUser.user.displayName.split(" ");
    const firstName = name[0];
    const lastName = name[1];

    return {
        
            firstName,
            lastName,
            uid: loggedInUser.user.uid,
            email: loggedInUser.user.email,
            password: userData.password,
        
    }
}


export const login = (userData) => async (dispatch) => {
    try {
        const loggedInUser = await API.signInUser(userData);
        console.log("loggedInUser-------", loggedInUser)
        await API.updateSignedInUser(loggedInUser);
        const signedInUser = formLoggedInUserData(loggedInUser, userData);

        localStorage.setItem("user", JSON.stringify(signedInUser));
        dispatch({
            type: USER_LOGIN_SUCCCESS,
            payload: { user: signedInUser }
        })
    }
    catch (error) {
        handleError(error, dispatch);
    }
}
// 1 Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.

export const isLoggedInUser = () => async (dispatch) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    // dirbtinas uždelsimas testavimui
    // await new Promise(res => setTimeout(() => res(), 2000));

    if (user) {
        dispatch({
            type: USER_LOGIN_SUCCCESS,
            payload: { user} 
        })
    } else {
        dispatch({
            type: USER_DATA_NOT_FOUND
        })
    }
}

export const logout = (uid) => async (dispatch) => {

    try {
        await API.updateLogoutUser(uid);
        await API.logoutUser();
        localStorage.clear();
        dispatch({
            type: USER_LOGOUT_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAILURE
        })
    }
}

export const deleteAuthErr = {
    type: AUTH_DELETE_ERR
}

export const update = (user, firstName, lastName, email, password) => async (dispatch) => {
    try {
        await API.updateUsersData(user, firstName, lastName, email, password);
        if (password) {
            await API.changePassword(user, password);
        }
        if (email) {
            await API.changeEmail(email);
        }
        if (user.firstName !== firstName || user.lastName !== lastName) {
            await API.updateUserDisplayName(user, firstName, lastName);
        }
        const updatedUser = {
            firstName: firstName === "" ? user.firstName : firstName,
            lastName: lastName === "" ? user.lastName : lastName,
            uid: user.uid,
            password: password === "" ? user.password : password,
            email: email === "" ? user.email : email
        }
        console.log("updated user: ", updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: { user: updatedUser }
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAILURE,
            payload: { error: error.message }
        })
        console.log(error)
    }
}
