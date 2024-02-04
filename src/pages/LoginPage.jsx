import LoginForm from '../containers/LoginForm'
import { motion } from 'framer-motion'
const LoginPage = () => {
	return (
		<>
			<motion.div
				className=" mx-auto p-8 md:max-w-screen-lg"
				initial={{
					opacity: 0,
					y: 10,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				transition={{ type: 'spring', stiffness: 100 }}
			>
				<LoginForm />
			</motion.div>
		</>
	)
}
export default LoginPage
