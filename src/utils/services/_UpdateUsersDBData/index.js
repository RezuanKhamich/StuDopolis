import {collection, doc, limit, onSnapshot, orderBy, query, setDoc} from "firebase/firestore";
import {db} from "../../../firebase";

export const addFieldForAllUsers = async () => {
  const usersRef = collection(db, "users");
  const q = await query(usersRef);

  onSnapshot(q, (snapshot => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data())
    })
  }))

  // await setDoc(doc(db, "users", user.uid), {
  //   firstName: userEnteredData.firstNameRef.current.value,
  //   photoIdRef: userEnteredData.photoSelected,
  //   lastName: userEnteredData.lastNameRef.current.value,
  //   email: user.email,
  //   createdAt: user.metadata.createdAt,
  //   lastLoginAt: user.metadata.lastLoginAt,
  //   experienceAmount: 0,
  //   goldCoinAmount: 10,
  //   greenCoinAmount: 2000,
  //   resolvedFreelanceTaskCount: 0,
  //   careerPosition: 0,
  //   careerAwardDate: 0,
  //   careerAccumulatedAmount: 0,
  // })
}