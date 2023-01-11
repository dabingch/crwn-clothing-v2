import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { UserProvider } from './contexts/UserContext'
import { CategoriesProvider } from './contexts/CategoriesContext'
import { CartProvider } from './contexts/CartContext'

import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './utils/stripe/stripe'

import App from './App'
import './index.scss'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<CategoriesProvider>
					<CartProvider>
						<Elements stripe={stripePromise}>
							<App />
						</Elements>
					</CartProvider>
				</CategoriesProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
