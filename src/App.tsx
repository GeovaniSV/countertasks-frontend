import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SideBar from './components/SideBar'

//pages
import ComponentsUsage from './pages/ComponentsUsage'
import Home from './pages/Home'

function App() {
	return (
		<div className="flex">
			<SideBar />
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/componentes"
						element={<ComponentsUsage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
