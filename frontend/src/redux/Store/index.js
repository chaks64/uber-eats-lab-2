import { createStore, compose } from "redux";
import rootReducer from "../Reducer/comReducer";

const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer, storeEnhancer());

export default store;