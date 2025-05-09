import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar'

function Layout() {
	return (
		<div className="flex">
			<SideBar />
			<Outlet />
		</div>
	)
}

export default Layout
