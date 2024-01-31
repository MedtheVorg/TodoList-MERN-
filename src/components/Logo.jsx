const Logo = ({ text }) => {
	return (
		<div>
			<h1 className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0 text-xl uppercase font-bold leading-7 tracking-wider">
				{text}
			</h1>
		</div>
	)
}
export default Logo
