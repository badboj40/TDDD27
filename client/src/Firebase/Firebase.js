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
        console.log("Google sign in result:", result);
        const name = result.user.displayName;
        const email = result.user.email;
        //console.log("user result", result.user)
        let data = handleLogin(result)
        //console.log(data)

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


const handleLogin = async (result) => {
  console.log("before logging in.");
  let data = {
    'idToken': result._tokenResponse.idToken,
    'accessToken': result.user.accessToken,
    'uid': result.user.uid,
    'email':result.user.email
  };

  await axios.post('http://' + window.location.host + '/login', data)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    })
};

