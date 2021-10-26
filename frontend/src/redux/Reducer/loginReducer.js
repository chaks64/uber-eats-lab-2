import { LOGIN_USER, LOGOUT_USER,SIGN_UP  } from "../constants";


const initialState = {
    user: {}
  };

const loginReducer = (state=initialState, action) => {
    
    switch(action.type){
        case LOGIN_USER : 
        console.log("in reducer ",action.type);
            return{
                ...state,
                user:action.payload
            } 

        case LOGOUT_USER : 
            return {
                ...state,
                user:action.payload
            }
        
        case SIGN_UP :
            return{
                state:action.value
            }
        
        default : 
            return {...state}
    }
}

export default loginReducer

