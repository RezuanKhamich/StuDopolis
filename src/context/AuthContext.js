import React, {useContext, useEffect, useState} from "react";
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

let user = '';

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();


  const signup = (userData, setError, handleClick) => (
    createUserWithEmailAndPassword(auth, userData.emailRef.current.value, userData.passwordRef.current.value)
      .then(async (userCredential) => {
        user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          firstName: userData.firstNameRef.current.value,
          lastName: userData.lastNameRef.current.value,
          email: user.email,
          createdAt: user.metadata.createdAt,
          lastLoginAt: user.metadata.lastLoginAt,
        })
        handleClick()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`Ошибка: пользователь с данным email существует`)
      })
  )

  const signin = (userData, setError, setLoading) => {
    // console.log(userData);
    signInWithEmailAndPassword(auth, userData.emailRef.current.value, userData.passwordRef.current.value)
      .then((userCredential) => {
        user = userCredential.user;
        localStorage.setItem('st_user_authorized', 'true');
        navigate("/courses");
      })
      .catch((error) => {
        console.log(error)

        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false)
        setError(`Ошибка: проверьте правильность введенных данных`)
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false)
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    signin,
  }

  return(
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
