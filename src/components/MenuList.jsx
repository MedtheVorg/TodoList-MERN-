import { useStore } from '../hooks/useStore'
import Button from './Button'

const MenuList = ({ className }) => {
	//switch visible buttons based on user State
	return (
		<ul className={className}>
			<li className="p-2">
				<Button text={'home'} />
			</li>
			<li className="p-2">profile</li>
			<li className="p-2">signIn</li>
		</ul>
	)
}
export default MenuList
