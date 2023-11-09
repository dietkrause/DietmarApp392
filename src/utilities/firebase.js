
import { connectAuthEmulator,getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut,signInWithCredential } from 'firebase/auth';
import { connectDatabaseEmulator } from "firebase/database";
import {firebase,db} from "./crud";
import { useEffect, useState } from 'react';


const auth = getAuth(firebase);


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