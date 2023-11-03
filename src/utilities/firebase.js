
import { connectAuthEmulator,getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut,signInWithCredential } from 'firebase/auth';
import { connectDatabaseEmulator } from "firebase/database";
import {firebase,db} from "./crud";
import { useEffect, useState } from 'react';

const auth = getAuth(firebase);
if (!globalThis.EMULATION && import.meta.env.MODE === 'development') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(db, "127.0.0.1", 9000);

signInWithCredential(auth, GoogleAuthProvider.credential(
  '{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
));

// set flag to avoid connecting twice, e.g., because of an editor hot-reload
globalThis.EMULATION = true;
}

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};