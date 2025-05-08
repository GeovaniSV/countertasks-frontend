import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import SideBar from './components/SideBar'
import ComponentsUsage from './pages/ComponentsUsage'
import Login from './pages/Login'

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
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
