import BoringAvatar from '../BoringAvatar'

const Owner = ({ name, authorID }) => {
	return (
		<div>
			<BoringAvatar authorName={name} authorID={authorID} />
		</div>
	)
}
export default Owner
