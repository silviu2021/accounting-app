import React, { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdRcGdMMUwX1bk5DNIYfpb1ugWMAwBAUg",
  authDomain: "accounting-app-951b4.firebaseapp.com",
  projectId: "accounting-app-951b4",
  storageBucket: "accounting-app-951b4.appspot.com",
  messagingSenderId: "234646115365",
  appId: "1:234646115365:web:979f1b6a25e8a7a3081bcc"
};

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
    const [app] = useState(initializeApp(firebaseConfig));
    const [auth] = useState(getAuth(app));
    const [db] = useState(getFirestore(app));

    return (
      <FirebaseContext.Provider value={{ db, auth }}>
        {children}
      </FirebaseContext.Provider>
    );
  };


export const useFirebase = () => useContext(FirebaseContext);