const Label = ({ value, htmlFor }) => {
	return (
		<label htmlFor={htmlFor} className="block text-xs font-semibold text-gray-600 uppercase">
			{value}
		</label>
	)
}
export default Label
