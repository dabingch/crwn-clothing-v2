import { useContext, useState } from 'react'

import { CartContext } from '../../contexts/CartContext'
import { UserContext } from '../../contexts/UserContext'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import Button from '../button/Button'

import { PaymentFormContainer, FormContainer } from './payment-form.styles'

const PaymentForm = () => {
	const stripe = useStripe()
	const elements = useElements()
	const { cartTotal: amount } = useContext(CartContext)
	const { currentUser } = useContext(UserContext)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)

	const paymentHandler = async (e) => {
		e.preventDefault()

		if (!amount) {
			alert('Your cart is empty!')
			return
		}

		if (!stripe || !elements) {
			return
		}

		setIsProcessingPayment(true)

		const response = await fetch(
			'/.netlify/functions/create-payment-intent',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ amount: amount * 100 }),
			}
		)
			.then((res) => res.json())
			.catch((err) => console.error(err))

		// console.log(response)
		const {
			paymentIntent: { client_secret },
		} = response

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		})

		setIsProcessingPayment(false)

		if (paymentResult.error) {
			alert(paymentResult.error.message)
		} else {
			if (paymentResult.paymentIntent.status === 'succeeded') {
				alert('Payment succeeded!')
			}
		}
	}

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement />
				<Button isLoading={isProcessingPayment} buttonType='inverted'>
					Pay now
				</Button>
			</FormContainer>
		</PaymentFormContainer>
	)
}

export default PaymentForm
