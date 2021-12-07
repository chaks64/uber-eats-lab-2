import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'; 
import store from "./redux/Store/index";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
const client = new ApolloClient({ uri: `http://localhost:3001/graphql` });
ReactDOM.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <Provider store = {store}>
      <App />
    </Provider>
    </ApolloProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
