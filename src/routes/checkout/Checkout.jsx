import { useContext } from 'react'

import CheckoutItem from '../../components/checkout-item/CheckoutItem'
import PaymentForm from '../../components/payment-form/PaymentForm'

import { CartContext } from '../../contexts/CartContext'

import './checkout.styles.scss'

const Checkout = () => {
	const { cartItems, cartTotal } = useContext(CartContext)

	return (
		<div className='checkout-container'>
			<div className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>
				<div className='header-block'>
					<span>Description</span>
				</div>
				<div className='header-block'>
					<span>Quantity</span>
				</div>
				<div className='header-block'>
					<span>Price</span>
				</div>
				<div className='header-block'>
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<span className='total'>Total: ${cartTotal}</span>
			<PaymentForm />
		</div>
	)
}

export default Checkout
