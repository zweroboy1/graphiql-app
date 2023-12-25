import {
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { getErrorText } from '../utils/getErrorText';

export const registerUser = async (user: {
  email: string;
  password: string;
  name: string;
}) => {
  const { email, password, name } = user;
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const userFromServer = res.user;
  await updateProfile(userFromServer, { displayName: name });
  await addDoc(collection(db, 'users'), {
    uid: userFromServer.uid,
    authProvider: 'local',
    email,
    name: userFromServer.displayName,
  });
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    throw error;
  });
};

export const logoutUser = async () => {
  return signOut(auth).catch((e) => {
    const errorCode = e instanceof Error ? e.message : null;
    const toastText = getErrorText(errorCode, 'en');
    toast.error(toastText, {
      className: 'toast-error',
    });
  });
};
