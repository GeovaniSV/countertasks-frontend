import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ComponentsUsage from './pages/ComponentsUsage'
import SideBar from './components/SideBar'

function App() {
	return (
		<div className="flex">
			<SideBar />
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<ComponentsUsage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
