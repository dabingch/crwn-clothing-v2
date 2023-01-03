import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../contexts/CartContext'

import './cart-dropdown.styles.scss'

import Button from '../button/Button'
import CartItem from '../cart-item/CartItem'

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext)
	const navigate = useNavigate()

	const goToCheckoutHandler = () => {
		navigate('/checkout')
	}

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((cartItem) => (
					<CartItem key={cartItem.id} cartItem={cartItem} />
				))}
			</div>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</div>
	)
}

export default CartDropdown
