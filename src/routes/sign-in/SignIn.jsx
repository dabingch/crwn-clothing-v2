// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import {
	// auth,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	// signInWithGoogleRedirect,
} from "../../utils/firebase/firebase";

const SignIn = () => {
	// Sign In with redirect
	// useEffect(async () => {
	// 	const { user } = await getRedirectResult(auth);
	// 	console.log(user);

	// 	if (user) {
	// 		const userDocRef = await createUserDocumentFromAuth(user);
	// 	}
	// }, []);

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
		</div>
	);
};

export default SignIn;
