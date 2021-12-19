import React from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBDBVhi5lczc6pil__cdi19-Y5uzYh24zY",
  authDomain: "gogameservice.firebaseapp.com",
  databaseURL: "https://gogameservice-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gogameservice",
  storageBucket: "gogameservice.appspot.com",
  messagingSenderId: "897031009934",
  appId: "1:897031009934:web:4f11e8fa4557ab744dfbdf",
  measurementId: "G-SYPG4WVS18"
};

const Rating = props => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <form>
        <input type="text" name="userId" placeholder="UserId"/>
        <input type="text" name="firstName" placeholder="First name"/>
        <input type="text" name="lastName" placeholder="Last name"/>
        <input type="number" name="age" placeholder="Age"/>
        <button id="addBtn">Add</button>
        <button id="updateBtn">Update</button>
        <button id="removeBtn">Remove</button>
    </form>
  )
}

export default Rating