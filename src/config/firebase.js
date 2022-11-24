import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAn5O7QBMbYP1kJtufodq-fzR_qDacoh34",
  authDomain: "mosh-itcmicroblogging-app.firebaseapp.com",
  projectId: "mosh-itcmicroblogging-app",
  storageBucket: "mosh-itcmicroblogging-app.appspot.com",
  messagingSenderId: "879042515004",
  appId: "1:879042515004:web:8ae385c2c2688c30fef339",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export default firebaseConfig;

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};
