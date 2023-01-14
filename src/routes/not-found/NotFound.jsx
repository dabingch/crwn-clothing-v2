import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div>
			<h1 align='center'>
				<Link to='/'>
					Oops! You seem to be lost. Click here to go back to main
					page
				</Link>
			</h1>
		</div>
	)
}
