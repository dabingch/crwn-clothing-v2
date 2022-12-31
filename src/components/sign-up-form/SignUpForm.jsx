import { useState, useContext } from 'react'

import FormInput from '../form-input/FormInput'
import Button from '../button/Button'

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase'

import { UserContext } from '../../contexts/UserContext'

import './sign-up-form.styles.scss'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { displayName, email, password, confirmPassword } = formFields

	const { setCurrentUser } = useContext(UserContext)

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			alert("Passwords don't match")
			return
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			)

			setCurrentUser(user)

			await createUserDocumentFromAuth(user, { displayName })
			resetFormFields()
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('Email already in use')
			} else {
				console.error(err)
			}
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target

		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					required
					type='text'
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>

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

				<FormInput
					label='Confirm Password'
					required
					type='password'
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	)
}

export default SignUpForm
