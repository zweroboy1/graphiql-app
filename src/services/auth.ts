import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const registerUser = async (user: {
  email: string;
  password: string;
}) => {
  const { email, password } = user;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      return;
    }
    console.log(error.name);
  }
};

export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    console.log(error);
  });
};

export const logoutUser = () => {
  signOut(auth).catch((error) => {
    console.log(error);
  });
};
