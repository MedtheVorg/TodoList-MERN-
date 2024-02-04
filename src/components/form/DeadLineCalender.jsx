import { twMerge } from 'tailwind-merge'

const DeadLineCalender = ({
	className,
	isDisabled,
	minDate = new Date().toISOString().split('T')[0],
	value,
	onChange,
	name,
	reference,
}) => {
	return (
		<input
			type="date"
			className={twMerge(
				'border-[1px] p-2 outline-transparent focus:outline-blue-400  transition-colors ',
				className,
			)}
			min={minDate}
			disabled={isDisabled}
			value={value}
			onChange={onChange}
			required
			name={name}
			ref={reference}
		/>
	)
}
export default DeadLineCalender
