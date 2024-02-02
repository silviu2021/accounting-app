import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebase } from "./Firebase";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const _firebase = useFirebase();
  const auth = _firebase?.auth;
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate("/");
      } else {
        setUser(null);
        navigate("/login");
      }
      setLoaded(true);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, loaded }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(FirebaseContext);
