import { twMerge } from 'tailwind-merge'

const Button = ({ text, className }) => {
	return (
		<button
			type="button"
			className={twMerge(
				'inline-block rounded bg-blue-600  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white  ',
				className,
			)}
		>
			{text}
		</button>
	)
}
export default Button
