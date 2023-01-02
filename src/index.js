import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { UserProvider } from './contexts/UserContext'
import { ProductsProvider } from './contexts/ProductsContext'

import './index.scss'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<ProductsProvider>
					<App />
				</ProductsProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
