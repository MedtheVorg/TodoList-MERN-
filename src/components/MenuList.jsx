import { Link } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import Button from './Button'
import BoringAvatar from './BoringAvatar'
import { useEffect } from 'react'
import { logInWithJwt } from '../utils/handlers/userHandler'

const MenuList = ({ className, setIsMenuOpen }) => {
	//switch visible buttons based on user State
	const { user, setUser } = useStore()

	useEffect(() => {
		logInWithJwt().then((response) => {
			if (response) {
				setUser({
					...response?.data?.user,
					_id: response?.data?.user.id,
				})
			}
		})
	}, [])
	return (
		<ul className={className}>
			{user && (
				<>
					<li className="p-2">
						<BoringAvatar authorName={user.username} authorID={user._id} />
					</li>

					<li className="p-2">
						<Button
							className={'mt-0  p-4 h-full flex items-center justify-center  '}
							value={<Link to={'/login'}>Log out</Link>}
							onClick={function logOutUser() {
								setUser(null)
								//remove token from local storage
								localStorage.removeItem('token')
							}}
						/>
					</li>
				</>
			)}
			{!user && (
				<>
					<li className="p-2">
						<Button
							className={'p-0 mt-0 '}
							onClick={function toggleMenu() {
								setIsMenuOpen((prev) => !prev)
							}}
							value={
								<Link to={'/login'} className={'  p-4 h-full flex items-center justify-center   '}>
									Log In
								</Link>
							}
						/>
					</li>
					<li className="p-2">
						<Button
							className={'p-0 mt-0'}
							onClick={function toggleMenu() {
								setIsMenuOpen((prev) => !prev)
							}}
							value={
								<Link to={'/register'} className={' p-4 h-full flex items-center justify-center'}>
									Register
								</Link>
							}
						/>
					</li>
				</>
			)}
		</ul>
	)
}
export default MenuList
