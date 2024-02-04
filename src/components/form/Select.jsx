import { twMerge } from 'tailwind-merge'

const Select = ({
	className,
	placeholder = 'select a choice.',
	choices = [],
	isDisabled,
	value,
	onChange,
	name,
	reference,
}) => {
	return (
		<select
			className={twMerge(
				'border-[1px] p-2 outline-transparent focus:outline-blue-400  transition-colors ',
				className,
			)}
			disabled={isDisabled}
			value={value}
			onChange={onChange}
			required
			name={name}
			ref={reference}
		>
			<option value="" disabled>
				{placeholder}
			</option>
			{choices.map((choice, index) => (
				<option key={choice + index} value={choice}>
					{choice}
				</option>
			))}
		</select>
	)
}

export default Select
