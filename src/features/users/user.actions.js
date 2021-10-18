import API from "../../API";
import {
    GET_REALTIME_USERS_SUCCESS,
    GET_REALTIME_MESSAGES_SUCCESS,
    GET_REALTIME_MESSAGES_FAILURE
} from "./actionTypes";


export const getRealTimeUsers = (uid) => async (dispatch) => {

    const unsubscribe = API.getRealTimeUsersOnSnapshot(uid, (users, authenticatedUser) => {
        dispatch({
            type: GET_REALTIME_USERS_SUCCESS,
            payload: { users, authenticatedUser }
        })
    });

    return unsubscribe;
}

export const updateMessage = (msgObj) => async (dispatch) => {
    try {
        API.updateUsermessage(msgObj);
    } catch (error) {
        console.log(error);
    }
}


export const getRealTimeConversations = (chatUsers) => async (dispatch) => {
    API.getRealTimeConversationsOnSnapshot(chatUsers, conversations => {
        if (conversations.length > 0) {
            console.log("conversations", conversations)
            dispatch({
                type: GET_REALTIME_MESSAGES_SUCCESS,
                payload: { conversations }
            })
        } else {
            dispatch({
                type: GET_REALTIME_MESSAGES_FAILURE,
                payload: { conversations }
            })
        }
    })
}