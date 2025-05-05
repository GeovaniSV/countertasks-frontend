import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SideBar from './components/SideBar'
import ComponentsUsage from './pages/ComponentsUsage'

function App() {
	return (
		<div>
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
