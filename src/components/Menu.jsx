import { RxHamburgerMenu } from 'react-icons/rx'
import { useState } from 'react'
import MenuList from './MenuList'
const Menu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	return (
		<>
			{/* desktop menu */}
			<div className="hidden lg:block">
				<MenuList className={'flex'} />
			</div>

			{/* mobile menu */}
			<div className="lg:hidden">
				<button
					onClick={function toggleMenu() {
						setIsMenuOpen((prev) => !prev)
					}}
				>
					<RxHamburgerMenu size={40} />
				</button>
				{isMenuOpen && (
					<MenuList
						className={
							'absolute top-[100%]  right-0 flex bg-gray-100 flex-col gap-y-6 w-fit transition-all '
						}
					/>
				)}
			</div>
		</>
	)
}
export default Menu
