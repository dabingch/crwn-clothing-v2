// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/SignUpForm";
import SignInForm from "../../components/sign-in-form/SignInForm";

import "./authentication.styles.scss";

// import {
// 	auth,
// 	signInWithGoogleRedirect,
// } from "../../utils/firebase/firebase";

const Authentication = () => {
	// Sign In with redirect
	// useEffect(async () => {
	// 	const { user } = await getRedirectResult(auth);
	// 	console.log(user);

	// 	if (user) {
	// 		const userDocRef = await createUserDocumentFromAuth(user);
	// 	}
	// }, []);

	return (
		<div className="authentication-container">
			<SignInForm />
			<SignUpForm />
		</div>
	);
};

export default Authentication;
