import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log("You just signed in", uid);
    // ...
  } else {
    console.log("Else!");
  }
});
