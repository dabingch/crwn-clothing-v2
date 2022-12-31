import { useState, useContext } from 'react'

import FormInput from '../form-input/FormInput'
import Button from '../button/Button'

import { UserContext } from '../../contexts/UserContext'

import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase'

import './sign-in-form.styles.scss'

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	const { setCurrentUser } = useContext(UserContext)

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			)

			setCurrentUser(user)

			resetFormFields()
		} catch (err) {
			switch (err.code) {
				case 'auth/user-not-found':
					alert('User not found')
					break

				case 'auth/wrong-password':
					alert('Wrong password')
					break

				default:
					console.error(err)
			}
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target

		setFormFields({ ...formFields, [name]: value })
	}

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup()
		await createUserDocumentFromAuth(user)
	}

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					required
					type='email'
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					required
					type='password'
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button onClick={signInWithGoogle} buttonType='google'>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
