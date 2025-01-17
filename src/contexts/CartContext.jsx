import { createContext, useState, useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from './UserContext'

import {
	addCartToFirestore,
	getCartsAndDocuments,
} from '../utils/firebase/firebase'

const addCartItem = (cartItems, productToAdd) => {
	// Find if cartItems contains the productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	)

	// If found, increment quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		)
	}

	// return new array with modified cartItem/new cartItem
	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	)

	if (existingCartItem.quantity === 1) {
		return cartItems.filter(
			(cartItem) => cartItem.id !== cartItemToRemove.id
		)
	}

	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	)
}

const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
})

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [cartTotal, setCartTotal] = useState(0)

	const { currentUser } = useContext(UserContext)

	const navigate = useNavigate()

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		)

		setCartCount(newCartCount)
	}, [cartItems])

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		)

		setCartTotal(newCartTotal)
	}, [cartItems])

	useEffect(() => {
		// Get cart items from Firestore
		getCartsAndDocuments(currentUser)
			.then((items) => {
				setCartItems(items)
			})
			.catch((err) => console.log(err))
	}, [currentUser])

	const addItemToCart = (productToAdd) => {
		if (!currentUser) {
			navigate('/auth')
			return
		}
		const newCartItems = addCartItem(cartItems, productToAdd)
		setCartItems(addCartItem(cartItems, productToAdd))
		addCartToFirestore(currentUser, newCartItems)
	}

	const removeItemFromCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove)
		setCartItems(removeCartItem(cartItems, cartItemToRemove))
		addCartToFirestore(currentUser, newCartItems)
	}

	const clearItemFromCart = (cartItemToClear) => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear)
		setCartItems(clearCartItem(cartItems, cartItemToClear))
		addCartToFirestore(currentUser, newCartItems)
	}

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		cartTotal,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
