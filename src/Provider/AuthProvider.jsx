/* eslint-disable react/prop-types */
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import auth from "../config/firebase.config";
  
  
  export const AuthContext = createContext(null);
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider()
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
  
    // google login
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, provider);
    };

    // github Login 

    const githubLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth,githubProvider)
    }
  
    // user create
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // sing in user
  
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // user log out
  
    const userLogOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    const updateUserProfile = (name, photo) => {
      setLoading(true);
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    };
  
    // observer auth state
  
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("current user", currentUser);
        setUser(currentUser);
        setLoading(false);
      });
      return () => {
        return unSubscribe();
      };
    }, []);
  
    const authInfo = {
      googleLogin,
      createUser,
      signInUser,
      user,
      userLogOut,
      updateUserProfile,
      loading,
      githubLogin
    };
  
    return (
      <div>
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
      </div>
    );
  };
  
  export default AuthProvider;