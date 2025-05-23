import { Outlet, useLocation } from 'react-router-dom'
import SideBar from './components/SideBar'
import Header from './components/Header'
import { useEffect, useState } from 'react'

function Layout() {
	const [openSideBar, setOpenSideBar] = useState(false)
	const location = useLocation()
	let currentLocation = ''

	const handleSideBar = () => {
		setOpenSideBar(!openSideBar)
	}

	useEffect(() => {
		if (currentLocation !== location.pathname) {
			currentLocation = location.pathname
			setOpenSideBar(false)
		}
	}, [location.pathname])

	return (
		<main>
			<Header handleOpenSideBar={handleSideBar} />
			<div className="flex ">
				<SideBar sideBarStatus={openSideBar} />
				<Outlet />
			</div>
		</main>
	)
}

export default Layout
