import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
//components
import SideBarButton from '../ui/SideBarButton'

//images

import {
	HomeIcon,
	RectangleStackIcon,
	UserIcon,
	ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline'

function SideBar() {
	const location = useLocation()
	const [active, setAcitve] = useState({
		home: false,
		history: false,
		profile: false,
	})
	const buttonRef = useRef<HTMLAnchorElement>(null)

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('email')
		localStorage.removeItem('userId')
		localStorage.removeItem('name')
	}

	const handleParams = () => {
		if (location.pathname === '/home') {
			setAcitve({ home: true, history: false, profile: false })
		}

		if (location.pathname === '/history') {
			setAcitve({ home: false, history: true, profile: false })
		}

		if (location.pathname === '/profile') {
			setAcitve({ home: false, history: false, profile: true })
		}
	}

	useEffect(() => {
		handleParams()
	}, [location.pathname])
	return (
		<main className="h-screen border-r border-gray-300 shadow-lg w-72 bg-white flex flex-col justify-between max-lg:hidden">
			<div>
				<Link
					to={'/home'}
					className="flex flex-col items-end border-b pr-10 pb-2 border-gray-400 shadow-sm mt-5">
					<span className="font-bold text-5xl mx-auto">Counter</span>
					<span className="font-bold text-5xl ml-[40%]">Tasks</span>
				</Link>

				<div className="p-2 mx-auto w-64 mt-10">
					<ul className="flex flex-col gap-2">
						<li>
							<SideBarButton
								to="/home"
								ref={buttonRef}
								title="INÍCIO"
								className={active.home ? 'bg-amber-200' : ''}>
								<HomeIcon className="size-8" />
							</SideBarButton>
						</li>

						<li>
							<SideBarButton
								to="/history"
								ref={buttonRef}
								title="HISTÓRICO"
								className={active.history ? 'bg-amber-200' : ''}>
								<RectangleStackIcon className="size-8" />
							</SideBarButton>
						</li>

						<li>
							<SideBarButton
								to="/profile"
								ref={buttonRef}
								title="PERFIL"
								className={active.profile ? 'bg-amber-200' : ''}>
								<UserIcon className="size-8" />
							</SideBarButton>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<div className="border-t border-gray-300 shadow-inner">
					<div className="p-2 mx-auto w-64">
						<SideBarButton
							to="/login"
							ref={buttonRef}
							title="SAIR"
							onClick={handleLogout}>
							<ArrowLeftStartOnRectangleIcon className="size-8" />
						</SideBarButton>
					</div>
				</div>
			</div>
		</main>
	)
}

export default SideBar
