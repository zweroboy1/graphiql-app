import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const registerUser = async (user: {email: string, password: string }) => {
  const {email, password} = user;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
  }
};


export const loginUser = ({email, password}: {email: string; password: string}) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    // auth?.createCustomToken()
    console.log(userCredential.user);
    userCredential.user.getIdTokenResult().then((value) => localStorage.setItem('tokenID', value.token))
    localStorage.setItem('refreshToken', userCredential.user.refreshToken)
    return userCredential.user;
    // ...
  })
  .catch((error) => {
    console.log(error);

    // ..
  });
}

export const logoutUser = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
