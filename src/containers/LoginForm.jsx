import { useRef, useState } from 'react'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import Input from '../components/form/Input'
import { logInUser } from '../utils/handlers/userHandler'
import { toast } from 'react-toastify'
import { useStore } from '../hooks/useStore'
import { Link, useNavigate } from 'react-router-dom'
import Label from '../components/form/Label'

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { user, setUser } = useStore()
	const navigate = useNavigate()
	const email = useRef(null)
	const password = useRef(null)

	async function logInHandler(event) {
		setIsLoading(true)
		event.preventDefault()

		const serverResponse = await logInUser(email.current.value, password.current.value)
		if (serverResponse instanceof Error) {
			toast.error(serverResponse.response?.data?.message)
		} else {
			toast.success(`welcome ${serverResponse.user.username}`)
			localStorage.setItem('token', serverResponse.token)
			setUser(serverResponse.user)
			navigate('/')
		}

		setIsLoading(false)
	}
	return (
		<div className="pt-8 h-auto  bg-white rounded-md ">
			<h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Login</h2>
			<form className=" shadow-lg  p-16 text-xl flex flex-col gap-y-4" onSubmit={logInHandler}>
				<Label htmlFor={'email'} value={'E-mail'} />
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
						value={isLoading ? <Spinner /> : 'Login'}
						isDisabled={isLoading}
						className={'mt-0 w-full'}
					/>
				</div>
				<div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
					<p>
						You don&apos;t have an account ?{' '}
						<Link to={'/register'} className="flex-2 underline">
							Create an Account
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}
export default LoginForm
