import Avatar from 'boring-neutral-avatars'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const BoringAvatar = ({ authorName, authorID, size = 40 }) => {
	return (
		<div>
			<Link to={`/profile/${authorID}`}>
				<Avatar
					size={size}
					name={authorName}
					variant="beam"
					colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
				/>
			</Link>
		</div>
	)
}
export default BoringAvatar
