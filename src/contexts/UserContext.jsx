import { createContext, useState, useEffect } from 'react'
import {
	onAuthStateChangeListener,
	createUserDocumentFromAuth,
} from '../utils/firebase/firebase'

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const value = { currentUser, setCurrentUser }

	// Centralize the logic for listening to auth state changes
	// Observer pattern, run once when the component mounts
	useEffect(() => {
		const unsubscribe = onAuthStateChangeListener((user) => {
			// Only create a user document if the user exists
			if (user) {
				createUserDocumentFromAuth(user)
			}
			setCurrentUser(user)
			console.log(user)
		})

		return unsubscribe // Clean up the onAuthStateChangeListener method
	}, [])

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
