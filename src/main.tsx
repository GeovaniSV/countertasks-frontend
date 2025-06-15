import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes.tsx'
import './index.css'
import Home from './pages/Home/index.tsx'
import History from './pages/History/index.tsx'
import Profile from './pages/Profile/index.tsx'
import Login from './pages/Login/index.tsx'
import Register from './pages/Register/index.tsx'
import TaskTable from './pages/TaskTable/index.tsx'

import Layout from './Layout.tsx'

const router = createBrowserRouter([
	{
		element: <PrivateRoutes />,
		children: [
			{
				element: <Layout />,
				children: [
					{ path: '/home', element: <Home /> },
					{ path: '/history', element: <History /> },
					{ path: '/profile', element: <Profile /> },
					{ path: '/card/:id', element: <TaskTable /> },
				],
			},
		],
	},
	{ path: '/', element: <Navigate to="/login" /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
