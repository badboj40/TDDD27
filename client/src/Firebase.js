import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

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
            const name = result.user.displayName;
            const email = result.user.email;
            //const profilePic = result.user.photoURL;
        })
        .catch((error) => {
            console.log(error);
        })
};
