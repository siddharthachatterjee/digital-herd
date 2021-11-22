import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ContextProvider } from './context/Web3Context';
import {AuthContextProvider} from "./context/AuthContext";
import { IPFSContextProvider } from './context/IPFSContext';

//import firebase from "./firebase";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Web3ContextProvider>
        <AuthContextProvider>
          <IPFSContextProvider>
            <App />
          </IPFSContextProvider>
        </AuthContextProvider>
      </Web3ContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
