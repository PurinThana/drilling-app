// AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../firebaseConfic";
import "firebase/auth";
import {
  addUser,
  getUserByUsername,
  updateFieldInDoc,
  updateUser,
  deleteUser,
  getUserByID,
  getFieldFromDoc,
} from "../utils/user_confic";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [User_db, setUser_db] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSave, setCurrentSave] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    const fetchData = async () => {
      try {
        const result = await getUserByID(localStorage.getItem("id"));

        setUser_db(JSON.parse(result.user_db));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    Verify();
    return () => unsubscribe();
  }, []);
  const Verify = async () => {
    try {
      const idToken = localStorage.getItem("idToken");

      getAuth()
        .verifyIdToken(idToken)
        .catch((error) => {
          window.location.href("/Login");
        });
    } catch {}
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        User_db,
        isLoading,
        currentSave,
        setCurrentSave,
        setUser_db,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
