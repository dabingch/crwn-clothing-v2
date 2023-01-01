import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithRedirect,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: 'crwn-clothing-db-aff33.firebaseapp.com',
	projectId: 'crwn-clothing-db-aff33',
	storageBucket: 'crwn-clothing-db-aff33.appspot.com',
	messagingSenderId: '5288853663',
	appId: '1:5288853663:web:bcf539139f56866d2ba2aa',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
	prompt: 'select_account',
})

// Get auth
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider)

// Initialize Firestore
export const db = getFirestore()

// Create document in Firestore
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return

	const userDocRef = doc(db, 'users', userAuth.uid)

	console.log(userDocRef)

	const userSnapshot = await getDoc(userDocRef)
	console.log(userSnapshot)
	console.log(userSnapshot.exists())

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			})
		} catch (err) {
			console.log('error creating user', err.message)
		}
	}

	return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return
	}

	return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return
	}

	return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangeListener = (callback) =>
	onAuthStateChanged(auth, callback)
