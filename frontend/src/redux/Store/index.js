import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../Reducer/comReducer";

const loggerMiddleware = createLogger();

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleware,loggerMiddleware)))

// import { createStore, compose } from "redux";
// import rootReducer from "../Reducer/comReducer";
// import thunkMiddleware from 'redux-thunk';

// const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//     rootReducer, storeEnhancer());

export default store;