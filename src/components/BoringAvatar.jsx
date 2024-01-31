import Avatar from 'boring-neutral-avatars'

// eslint-disable-next-line react/prop-types
const BoringAvatar = ({ name }) => {
	return (
		<div>
			<Avatar
				size={40}
				name={name}
				variant="beam"
				colors={['#FF6F61', '#6B4226', '#1E90FF', '#FFD700', '#FF69B4']}
			/>
			;
		</div>
	)
}
export default BoringAvatar
