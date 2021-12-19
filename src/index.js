import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './reset.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import firebase from "firebase/compat";
// import 'firebase/firestore';
// import 'firebase/auth';
//
// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/ie11';
//
// firebase.initializeApp({
//   apiKey: "AIzaSyDAqqlhekfQSGobGoG0TdIxpSHj2pLRGDA",
//   authDomain: "chat-react-31d00.firebaseapp.com",
//   projectId: "chat-react-31d00",
//   storageBucket: "chat-react-31d00.appspot.com",
//   messagingSenderId: "266071800800",
//   appId: "1:266071800800:web:f197e3623e6c17ab0e8985",
//   measurementId: "G-PZ46ZLHB1B"
// });
//
// const Context = createContext(null)
//
// const auth = firebase.auth();
// const firestore = firebase.firestore()


const application = (
      // <Context.Provider value={{
      //   firebase,
      //   auth,
      //   firestore
      // }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      // </Context.Provider>
)

ReactDOM.render(
    application,
  document.getElementById('root')
);
