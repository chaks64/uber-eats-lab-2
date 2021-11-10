import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import restidReducer from "./restidReducer";

const rootReducer = combineReducers({
    loginreducer: loginReducer,
    restidReducer: restidReducer
})

export default rootReducer