import {
    GET_REALTIME_USERS_SUCCESS,
    GET_REALTIME_USERS_FAILURE,
    GET_REALTIME_MESSAGES_SUCCESS,
    GET_REALTIME_MESSAGES_FAILURE,
} from './actionTypes';

const initialState = {
    users: [],
    conversations: [],
    likes: null
};

const userReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {

        case GET_REALTIME_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                authenticatedUser: action.payload.authenticatedUser,
            };
        case GET_REALTIME_USERS_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        case GET_REALTIME_MESSAGES_SUCCESS:
            return {
                ...state,
                conversations: action.payload.conversations
            }
        case GET_REALTIME_MESSAGES_FAILURE:
            return {
                ...state,
                conversations: []
            }
            
        default:
            return state;
    }
}

export default userReducer;