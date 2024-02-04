import { twMerge } from 'tailwind-merge'

const TextArea = ({ className, isDisabled, value, onChange, name, reference }) => {
	return (
		<textarea
			className={twMerge(
				'border-[1px] p-2 outline-transparent focus:outline-blue-400  transition-colors ',
				className,
			)}
			disabled={isDisabled}
			required
			value={value}
			onChange={onChange}
			name={name}
			ref={reference}
		></textarea>
	)
}
export default TextArea
