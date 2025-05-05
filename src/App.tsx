import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ComponentsUsage from './pages/ComponentsUsage'

function App() {
	return (
		<div>
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
