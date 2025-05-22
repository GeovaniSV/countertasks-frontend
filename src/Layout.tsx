import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar'
import Header from './components/Header'
import { useState } from 'react'

function Layout() {
	const [openSideBar, setOpenSideBar] = useState(false)
	const handleSideBar = () => {
		setOpenSideBar(!openSideBar)
	}

	console.log(openSideBar)

	return (
		<main>
			<Header handleOpenSideBar={handleSideBar} />
			<div className="flex">
				<SideBar sideBarStatus={openSideBar} />
				<Outlet />
			</div>
		</main>
	)
}

export default Layout
