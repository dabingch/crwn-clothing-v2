import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
	google: 'google-sign-in',
	inverted: 'inverted',
}

const Button = ({ children, isLoading, buttonType, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]} 
			`}
			disabled={isLoading}
			{...otherProps}
		>
			{isLoading ? <LoadingSpinner /> : children}
		</button>
	)
}

export default Button
