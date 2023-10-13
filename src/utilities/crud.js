import { ref, set, update, remove, onValue } from 'firebase/database';
import { db } from "/Users/dietmarkrausegutierrez/Desktop/Northwestern/Fall2023/CS392/DietmarApp392/dietmarapp392/src/config.js"; // The path to your config file

const crud = {

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