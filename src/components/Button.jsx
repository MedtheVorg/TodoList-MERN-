import { twMerge } from 'tailwind-merge'

const Button = ({ value, className, onClick, isDisabled, type = 'button' }) => {
	return (
		<button
			type={type}
			className={twMerge(
				'w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none',
				className,
				isDisabled && 'bg-gray-300 hover:bg-gray-300',
			)}
			onClick={onClick}
			disabled={isDisabled}
		>
			{value}
		</button>
	)
}
export default Button
