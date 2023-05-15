import { initializeApp } from "firebase/app";
import {
  initWatchlist,
  initSeenlist,
  clearWatchlist,
  clearSeenlist,
  clearHomeMovies,
} from "../store";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import axios from 'axios';
import { GetHomeMovies } from "../Helpers/GetData";

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

export const signInWithGoogle = async (dispatch) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      console.log("Google sign in result:", result);
      handleLogin(result, dispatch)
    })
    .catch((error) => {
      console.log("signin error", error);
    })
};

export const signOutFromGoogle = (dispatch) => {
  signOut(auth)
    .then((result) => {
      handleLogout(result, dispatch)
    })
    .catch((error) => {
      console.log("signout error", error);
    })
};


const handleLogin = async (result, dispatch) => {
  console.log("Before logging in.");

  await axios.post('http://' + window.location.host + '/login', { 'idToken': result._tokenResponse.idToken })
    .then(response => {
      console.log("Login response", response.data)
      sessionStorage.setItem('watchlist', JSON.stringify(response.data.watchlist))
      sessionStorage.setItem('seenlist', JSON.stringify(response.data.seenlist))
      dispatch(initWatchlist())
      dispatch(initSeenlist())
      GetHomeMovies(dispatch)
      return response.data
    })
    .catch(error => {
      return error
    })
};

const handleLogout = async (result, dispatch) => {
  sessionStorage.removeItem('watchlist')
  sessionStorage.removeItem('seenlist')
  dispatch(clearWatchlist())
  dispatch(clearSeenlist())
  dispatch(clearHomeMovies())
  console.log("Successfully signed out.", result)
}

