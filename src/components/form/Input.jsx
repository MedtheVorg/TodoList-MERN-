import { twMerge } from 'tailwind-merge'

const Input = ({ placeholder, className, isDisabled, type = 'text', value, onChange, reference, name }) => {
	return (
		<input
			type={type}
			className={twMerge(
				'block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200',
				className,
			)}
			placeholder={placeholder}
			disabled={isDisabled}
			value={value}
			onChange={onChange}
			ref={reference}
			required
			name={name}
		/>
	)
}
export default Input
