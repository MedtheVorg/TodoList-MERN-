import Comment from '../components/Comment'
import { useStore } from '../hooks/useStore'
import AddCommentForm from './AddCommentForm'

const CommentsContainer = ({ taskID }) => {
	const { user, tasks } = useStore()
	const filteredTasks = tasks.filter((task) => task._id === taskID)
	return (
		<div className="p-2">
			<h2 className="text-2xl p-2">Comments</h2>

			{user && <AddCommentForm taskID={taskID} />}
			<div className="pl-4">
				{filteredTasks[0]?.comments?.length >= 0 &&
					filteredTasks[0]?.comments?.map((comment) => (
						<Comment
							key={comment._id}
							authorName={comment.author.username}
							authorID={comment.author._id}
							text={comment.text}
							createdAt={comment.createdAt}
						/>
					))}
			</div>
		</div>
	)
}
export default CommentsContainer
