import { REST_ID  } from "../constants";


const initialState = {
    rest: {}
  };

const restidReducer = (state=initialState, action) => {
    
    switch(action.type){
        case REST_ID : 
        console.log("in rest reducer ",action.type);
            return{
                ...state,
                rest:action.payload
            } 
        
        default : 
            return {...state}
    }
}

export default restidReducer