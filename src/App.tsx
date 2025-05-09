import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import SideBar from './components/SideBar'
import ComponentsUsage from './pages/ComponentsUsage'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
	return (
		<div className="flex">
			{/* <SideBar /> */}
			<BrowserRouter>
				<Routes>
					<Route
						path="/home"
						element={<ComponentsUsage />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
