import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {store} from "./utils/reducers";
import {Provider} from "react-redux";

const application = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
    application,
  document.getElementById('root')
);
