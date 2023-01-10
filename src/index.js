import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { UserProvider } from './contexts/UserContext'
import { CategoriesProvider } from './contexts/CategoriesContext'
import { CartProvider } from './contexts/CartContext'

import { Provider } from 'react-redux'
import { store } from './store/store'

import './index.scss'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<UserProvider>
					<CategoriesProvider>
						<CartProvider>
							<App />
						</CartProvider>
					</CategoriesProvider>
				</UserProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
