import { LOGIN_USER, LOGOUT_USER, SIGN_UP, REST_ID } from "../constants"

export const loginUser = (payload) =>{
    console.log("Dispatch");
    return{
        type: LOGIN_USER,
        payload
    };
}

export const logoutUser = (payload) =>{
    return{
        type: LOGOUT_USER,
        payload
    }
}

export const signup = (payload) =>{
    return{
        type: SIGN_UP,
        payload
    }
}

export const restid = (payload) =>{
    console.log("Dispatch");
    return{
        type: REST_ID,
        payload
    };
}