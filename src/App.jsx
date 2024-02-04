import Navbar from './containers/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import { AnimatePresence } from 'framer-motion'

function App() {
	const location = useLocation()
	return (
		<div className=" flex flex-col h-full">
			<header>
				<Navbar />
			</header>
			<main className="grow  bg-[#191C21] overflow-hidden">
				<AnimatePresence mode="wait">
					<Routes location={location} key={location.pathname}>
						<Route path="/*" element={<HomePage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</AnimatePresence>
			</main>
			<ToastContainer position="top-center" />
		</div>
	)
}

export default App
