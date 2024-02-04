import { useRef, useState } from 'react'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import Input from '../components/form/Input'
import { createUser } from '../utils/handlers/userHandler'
import { toast } from 'react-toastify'
import { useStore } from '../hooks/useStore'
import { Link, useNavigate } from 'react-router-dom'
import Label from '../components/form/Label'

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { user, setUser } = useStore()
	const navigate = useNavigate()
	const username = useRef(null)
	const email = useRef(null)
	const password = useRef(null)

	async function registerUser(event) {
		setIsLoading(true)
		event.preventDefault()

		const response = await createUser(username.current.value, email.current.value, password.current.value)
		if (!response.success) {
			toast.error(response.message)
		} else {
			toast.success('user created successfully')
			navigate('/login')
		}

		// show success message and close the form
		setIsLoading(false)
	}
	return (
		<div className="pt-8 h-auto bg-white rounded-md">
			<h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Register</h2>
			<form className=" shadow-lg  p-16 text-xl flex flex-col gap-y-4" onSubmit={registerUser}>
				<Label htmlFor={'username'} value={'Username'} />

				<Input
					placeholder={'username'}
					isDisabled={isLoading}
					reference={username}
					type="text"
					name={'username'}
				/>
				<Label htmlFor={email} value={'E-mail'} />
				<Input placeholder={'email'} isDisabled={isLoading} reference={email} type="email" name={'email'} />

				<Label htmlFor={'password'} value={'Password'} />
				<Input
					placeholder={'password'}
					isDisabled={isLoading}
					reference={password}
					type="password"
					name={'password'}
				/>
				<div className="flex justify-between">
					<Button
						type="submit"
						value={isLoading ? <Spinner /> : 'Register'}
						isDisabled={isLoading}
						className={'mt-0 w-full'}
					/>
				</div>
				<div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
					<p>
						Already a user?
						<Link to={'/login'} className="flex-2 underline">
							Log In
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}
export default RegisterForm
