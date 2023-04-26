import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyDMsNwx5KzZKx5tdeh0FcT8yY_ckeZMliE",
  authDomain: "tddd27-gg.firebaseapp.com",
  projectId: "tddd27-gg",
  storageBucket: "tddd27-gg.appspot.com",
  messagingSenderId: "622087775650",
  appId: "1:622087775650:web:cf7b13d091e47a9511fefb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();



export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
        console.log("Google sign in result:", result);

        let data = handleLogin(result)
    })
    .catch((error) => {
        console.log("signin error",error);
    })
};

export const signOutFromGoogle = () => {
  signOut(auth)
      .then((result) => {
        sessionStorage.removeItem('watchlist')
        console.log("Successfully signed out.", result)
      })
      .catch((error) => {
          console.log("signout error", error);
      })
};


const handleLogin = async (result) => {
  console.log("before logging in.");

  await axios.post('http://' + window.location.host + '/login', {'idToken': result._tokenResponse.idToken})
    .then(response => {
      console.log("login response", response.data)
      sessionStorage.setItem('watchlist', JSON.stringify(response.data.watchlist))
      return response.data
    })
    .catch(error => {
      return error
    })
};

