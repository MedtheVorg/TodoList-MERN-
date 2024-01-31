import Logo from '../components/Logo'
import Menu from '../components/Menu'

const Navbar = () => {
	return (
		<>
			<nav className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg lg:py-4">
				<div className="flex w-full flex-wrap items-center justify-between px-3">
					{/* LOGO */}
					<Logo text={'tasko'} />

					{/* mobile menu */}
					<Menu />
				</div>
			</nav>
		</>
	)
}
export default Navbar
