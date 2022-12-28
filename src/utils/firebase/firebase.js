import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithRedirect,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: "crwn-clothing-db-aff33.firebaseapp.com",
	projectId: "crwn-clothing-db-aff33",
	storageBucket: "crwn-clothing-db-aff33.appspot.com",
	messagingSenderId: "5288853663",
	appId: "1:5288853663:web:bcf539139f56866d2ba2aa",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
