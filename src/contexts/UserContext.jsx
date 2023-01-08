import { createContext, useEffect, useReducer } from 'react'

import {
	onAuthStateChangeListener,
	createUserDocumentFromAuth,
} from '../utils/firebase/firebase'

import { createAction } from '../utils/reducer/reducer'

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			}
		default:
			throw new Error(`Unhandled action type: ${type} in userReducer`)
	}
}

const INITIAL_STATE = {
	currentUser: null,
}

export const UserProvider = ({ children }) => {
	const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)

	const setCurrentUser = (user) => {
		// dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
		dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
	}

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
