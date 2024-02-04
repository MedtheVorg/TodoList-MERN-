import { twMerge } from 'tailwind-merge'

const Status = ({ value }) => {
	return (
		<div
			className={twMerge(
				'py-1 px-3 rounded-full uppercase font-semibold text-sm md:text-base',
				value === 'canceled' && 'bg-red-200 text-red-600 ',
				value === 'in progress' && 'bg-yellow-200 text-yellow-600 ',
				value === 'completed' && 'bg-green-200 text-green-600 ',
			)}
		>
			{value}
		</div>
	)
}
export default Status
