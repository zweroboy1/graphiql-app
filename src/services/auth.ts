import {
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const registerUser = async (user: {
  email: string;
  password: string;
  name: string;
}) => {
  const { email, password, name } = user;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await updateProfile(user, { displayName: name });
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
      name: user.displayName,
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      return;
    }
    console.log(error.name);
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    if (error.message.includes('invalid-credential')) {
      console.log(error.message);
      throw new Error('Your password or email is invalid.');
    } else {
      throw new Error('Something went wrong. Try again later.');
    }
  });
};

export const logoutUser = async () => {
  return signOut(auth).catch(() => {
    throw Error('Something went wrong. Try again later.');
  });
};
