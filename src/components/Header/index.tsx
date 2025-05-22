import { Link } from 'react-router-dom'
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import { MouseEventHandler } from 'react'

interface headerProps {
	handleOpenSideBar: MouseEventHandler
}

function Header({ handleOpenSideBar }: headerProps) {
	return (
		<main className="lg:hidden border-b flex fixed bg-white max-lg:w-full justify-between max-md:h-16 h-20 items-center border-gray-300 shadow-lg">
			<div className="h-full w-16">
				<button
					onClick={handleOpenSideBar}
					className="h-full w-full flex justify-center items-center">
					<Bars3Icon className="max-lg:size-15 max-md:size-10" />
				</button>
			</div>

			<Link
				className="flex md:gap-5 max-md:flex-col max-md:text-xl font-bold max-md:items-end items-center max-lg:text-5xl"
				to={'/home'}>
				<span>Counter</span>
				<span>Tasks</span>
			</Link>

			<div className="h-full w-16 flex justify-center items-center">
				<Link to={'/profile'}>
					<UserCircleIcon className="max-lg:size-15 max-md:size-10" />
				</Link>
			</div>
		</main>
	)
}

export default Header
