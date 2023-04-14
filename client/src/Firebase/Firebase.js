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

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
            const name = result.user.displayName;
            const email = result.user.email;
            handleLogin(result.user)

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
        })
        .catch((error) => {
            console.log(error);
        })
};

export const signOutFromGoogle = () => {
    signOut(auth)
        .then((result) => {
            console.log("Successfully signed out.", result)
        })
        .catch((error) => {
            console.log(error);
        })
};


const handleLogin = async (user) => {
  console.log("before logging in.");
  try {
    const response = await axios.post('http://' + window.location.host + '/login/', {
      idToken: user.idToken,
      accessToken: user.accessToken
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

