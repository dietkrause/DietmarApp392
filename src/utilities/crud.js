import { ref, set, update, remove, onValue,off } from 'firebase/database';
import { useState, useEffect } from 'react';
import { initializeApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

export const firebaseConfig = {
  apiKey: "AIzaSyBNcmnctjzYHOC4DuwPFGp9p5vZns87h44",
  authDomain: "dietmarapp392.firebaseapp.com",
  databaseURL: "https://dietmarapp392-default-rtdb.firebaseio.com",
  projectId: "dietmarapp392",
  storageBucket: "dietmarapp392.appspot.com",
  messagingSenderId: "563075927866",
  appId: "1:563075927866:web:fc3828832bf30b6c900a03"
};

let app = null;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
}
export const db = getDatabase(app);
export const firebase = app;
const auth = getAuth(firebase);

if (!globalThis.EMULATION && import.meta.env.MODE === 'development') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

signInWithCredential(auth, GoogleAuthProvider.credential(
  '{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
));

// set flag to avoid connecting twice, e.g., because of an editor hot-reload
globalThis.EMULATION = true;
}


export const useDbData = (path) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const refObj = ref(db, path);

    const listener = onValue(refObj, snapshot => {
      setData(snapshot.val());
      setIsLoading(false);
    }, err => {
      setError(err);
      setIsLoading(false);
    });

    // Cleanup listener when component is unmounted
    return () => off(refObj, listener);
  }, [path]);

  return [data, isLoading, error];
};

export const  crud = {

  // CREATE: Add or Update an entry
  createEntry: (path, data) => {
    const refObj = ref(db, path);
    return onValue(refObj, snapshot => {
      if (snapshot.exists()) {
        // if it does exist, update it
        // Ensure data is a valid object
        if (typeof data !== 'object' || data === null) {
          console.error("Invalid data for update. It should be a non-null object.");
          return;
        }
        return update(refObj, data);
      } else {
        // otherwise, create it
        return set(refObj, data);
      }
    });
  },

  // READ: Get all entries
  readAll: (path, callback) => {
    const refObj = ref(db, path);
    const listener = onValue(refObj, snapshot => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        data.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      callback(data); // Send data back to the component through callback
    });
  
    // Returning the listener lets you unregister it later if needed
    return listener;
  },

  // READ: Get an entry by path
  readEntry: (path, callback) => {
    // check if the path is valid
    if (!path) {
        callback(null, 'Path is not valid.');  // return error
        return;
    }
    const refObj = ref(db, path);
    onValue(refObj, snapshot => {
        const data = snapshot.val();
        if (data) {
            callback(data);  // return the fetched data
        } else {
            callback(null, 'No data found.');  // return error if no data found
        }
    });
},

  // UPDATE: Update an entry
  updateEntry: (path, updates) => {
    // check if the path is valid
    if (!path) {
      return;
    }
    // check if there's a path to update
    if (!updates) {
      return;
    }
    // check if there's an entry to update in the db
    if (Object.keys(updates).length === 0) {
      return;
    }
    const refObj = ref(db, path);
    return update(refObj, updates);
  },

  // DELETE: Remove an entry
  deleteEntry: (path) => {
    // check if the path is valid
    if (!path) {
      return;
    }
    const refObj = ref(db, path);
    return remove(refObj);
  }
};

export default crud;