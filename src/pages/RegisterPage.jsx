import RegisterForm from '../containers/RegisterForm'
import { motion } from 'framer-motion'
const RegisterPage = () => {
	return (
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
			<RegisterForm />
		</motion.div>
	)
}
export default RegisterPage
