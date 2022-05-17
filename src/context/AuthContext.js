import React, {useContext, useEffect, useState} from "react";
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {createDBArchitecture} from "../utils/services/createCourseDBArchitecture";
import {useDispatch, useSelector} from "react-redux";
import {setCourseData, setUserData} from "../utils/reducers/repoReducer";

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

let user = '';

export const AuthProvider = ({children}) => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const signup = (userEnteredData, setError, handleClick) => (
    createUserWithEmailAndPassword(auth, userEnteredData.emailRef.current.value, userEnteredData.passwordRef.current.value)
      .then(async (userCredential) => {
        user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          firstName: userEnteredData.firstNameRef.current.value,
          lastName: userEnteredData.lastNameRef.current.value,
          email: user.email,
          createdAt: user.metadata.createdAt,
          lastLoginAt: user.metadata.lastLoginAt,
          experienceAmount: 0,
          goldCoinAmount: 10,
          greenCoinAmount: 2000,
          careerPosition: 0,
          careerAwardDate: 0,
          careerAccumulatedAmount: 0,
        })

        await setDoc(doc(db, "courses", user.uid), createDBArchitecture())
        handleClick()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`Ошибка: пользователь с данным email существует`)
      })
  )

   const signin = (userEnteredData, setError, setLoading) => {
    signInWithEmailAndPassword(auth, userEnteredData.emailRef.current.value, userEnteredData.passwordRef.current.value)
      .then(async (userCredential) => {
        user = userCredential.user;
        localStorage.setItem('st_user_authorized', JSON.stringify(user));

        const userDataSnap = await getDoc(doc(db, "users", user.uid));
        const courseSnap = await getDoc(doc(db, "courses", user.uid));
        console.log('authorized')

        if (userDataSnap.exists()) {
          dispatch(setUserData(userDataSnap.data()));
        } else {
          console.log("No such userDataSnap!");
        }

        if (courseSnap.exists()) {
          dispatch(setCourseData(courseSnap.data()));
        } else {
          console.log("No such courseSnap!");
        }
        navigate("/courses");
      })
      .catch((error) => {
        console.log(error)

        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false)
        setError(`Ошибка: проверьте правильность введенных данных`)
      })
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
