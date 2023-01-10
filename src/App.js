import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
	onAuthStateChangeListener,
	createUserDocumentFromAuth,
} from './utils/firebase/firebase'

import { setCurrentUser } from './store/user/user.action'

import Home from './routes/home/Home'
import Navbar from './routes/navigation/Navbar'
import Authentication from './routes/authentication/Authentication'
import Shop from './routes/shop/Shop'
import Checkout from './routes/checkout/Checkout'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const unsubscribe = onAuthStateChangeListener((user) => {
			console.log(user)
			// Only create a user document if the user exists
			if (user) {
				createUserDocumentFromAuth(user)
				dispatch(setCurrentUser(user))
			}
		})

		return unsubscribe // Clean up the onAuthStateChangeListener method
	}, [dispatch]) // Here dispatch is not gonna change, just for clearing warning

	return (
		<Routes>
			<Route path='/' element={<Navbar />}>
				<Route index element={<Home />} />
				<Route path='/shop/*' element={<Shop />} />
				<Route path='/auth' element={<Authentication />} />
				<Route path='/checkout' element={<Checkout />} />
			</Route>
		</Routes>
	)
}

export default App
