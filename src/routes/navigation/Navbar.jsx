import { Link, Outlet } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import CartIcon from '../../components/cart-icon/CartIcon'
import CartDropdown from '../../components/cart-dropdown/CartDropdown'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'

import { UserContext } from '../../contexts/UserContext'
import { CartContext } from '../../contexts/CartContext'

import { signOutUser } from '../../utils/firebase/firebase'

import './navigation.styles.scss'

const Navbar = () => {
	const { currentUser } = useContext(UserContext)
	const { isCartOpen } = useContext(CartContext)

	const handleSignOut = () => {
		signOutUser()
	}

	return (
		<Fragment>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<CrownLogo className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
					{currentUser ? (
						<span className='nav-link' onClick={handleSignOut}>
							SIGN OUT
						</span>
					) : (
						<Link className='nav-link' to='/auth'>
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</Fragment>
	)
}

export default Navbar
