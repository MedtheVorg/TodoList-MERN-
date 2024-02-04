import { useRef, useState } from 'react'
import BoringAvatar from '../components/BoringAvatar'
import Input from '../components/form/Input'
import { useStore } from '../hooks/useStore'
import { createComment } from '../utils/handlers/commentHandler'
import { toast } from 'react-toastify'
import { getAllTasks } from '../utils/handlers/taskHandler'

const AddCommentForm = ({ taskID }) => {
	const { user, setTasks } = useStore()
	const comment = useRef(null)
	const [isLoading, setIsLoading] = useState(false)

	async function addComment(event) {
		event.preventDefault()
		setIsLoading(true)
		try {
			const serverResponse = await createComment(taskID, comment.current.value)
			console.log('serverResponse : ', serverResponse)
			if (serverResponse instanceof Error) {
				toast.error(serverResponse.message)
			} else {
				await getAllTasks().then((data) => {
					setTasks(data.tasks)
				})
			}
		} catch (error) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
			comment.current.value = ''
		}
	}
	return (
		<div className="p-2">
			<form className=" flex  gap-x-8  rounded-md" onSubmit={addComment}>
				<div className="  flex flex-col items-center justify-center ">
					<BoringAvatar authorName={user.username} authorID={user._id} />
					<p className="text-xl font-semibold">{user.username} </p>
				</div>
				<div className="  grow">
					<Input
						name={'comment'}
						reference={comment}
						className={'m-0 h-full p-2'}
						placeholder={'write a comment...'}
						isDisabled={isLoading}
					/>
				</div>
			</form>
		</div>
	)
}
export default AddCommentForm
