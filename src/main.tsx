import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import Home from './pages/Home/index.tsx'
import Login from './pages/Login/index.tsx'
import Register from './pages/Register/index.tsx'
import Layout from './Layout.tsx'

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: '/', element: <Navigate to="/login" /> },
			{ path: '/home', element: <Home /> },
		],
	},
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
