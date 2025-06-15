import { Navigate, Outlet, useLocation } from 'react-router-dom'

function PrivateRoutes() {
	const location = useLocation()

	if (location.pathname) {
		const token = localStorage.getItem('token')
		if (!token) {
			alert('Não autorizado')
			return (
				<Navigate
					to={'/login'}
					replace
				/>
			)
		}
	}

	return <Outlet />
}

export default PrivateRoutes
