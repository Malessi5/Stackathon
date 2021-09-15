import React, {useContext, useState, useEffect} from 'react';
import {auth} from './firebase';
import firebase from 'firebase/app';
import axios from 'axios';

const AuthContext = React.createContext();
const provider = new firebase.auth.GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        //console.log(newUser);
        createNewAccount(email, newUser.user.uid);
      });
  }

  function googleSignIn() {
    return auth.signInWithPopup(provider).then(async (result) => {
      // const credential = result.credential;
      // const token = credential.accessToken;
      const user = result.user;
      //check if user exists in db, if not, create a new document
      userExists(user);
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signout() {
    return auth.signOut();
  }

  async function userExists(user) {
    await axios.get(`/api/users/${user.uid}`).then((isUser) => {
      if (!isUser.data) {
        createNewAccount(user.email, user.uid);
      }
    });
  }

  async function createNewAccount(email, uid) {
    const userInfo = {uid: uid, email: email, drinks: []};
    await axios.post(`/api/users/${uid}`, userInfo);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signout,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
