import { useStore } from '../hooks/useStore'
import BoringAvatar from './BoringAvatar'

const Comment = ({ authorName, text, authorID, createdAt }) => {
	console.log(authorName, text)

	return (
		<div className="p-2 flex  gap-x-4 mt-4 bg-neutral-200 ">
			<div className="  flex flex-col items-center justify-center ">
				<BoringAvatar authorName={authorName} authorID={authorID} size={60} />
			</div>
			<div className="  grow">
				<p className="text-xl font-semibold">{authorName} </p>
				<p className="my-2">{text}</p>
				<p>{createdAt}</p>
			</div>
		</div>
	)
}
export default Comment
