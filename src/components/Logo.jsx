import { Link } from 'react-router-dom'

const Logo = ({ text }) => {
	return (
		<div>
			<Link to={'/'}>
				<h1 className="mx-2 my-1 flex items-center  lg:mb-0 lg:mt-0 text-xl uppercase font-bold leading-7 tracking-wider text-gray-800">
					{text}
				</h1>
			</Link>
		</div>
	)
}
export default Logo
