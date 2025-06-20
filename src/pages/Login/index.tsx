import React, { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../../services/api'
import './Login.css'

import InputField from '../../components/ui/InputField'
import ButtonField from '../../components/ui/ButtonField'

function Login() {
	const [inputValues, setInputValues] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()
	const buttonRef = useRef<HTMLButtonElement>(null)

	const handleSubmit = async () => {
		try {
			const { data } = await api.post('/login', {
				email: inputValues.email,
				password: inputValues.password,
			})
			localStorage.setItem('token', data.token)
			localStorage.setItem('userId', data.user.id)
			localStorage.setItem('name', data.user.name)
			localStorage.setItem('email', data.user.email)
			navigate('/home')
		} catch (e) {
			console.log(e)
			alert('Senha ou email incorretos')
		}
	}

	const handleKeySubmit = (e: React.KeyboardEvent) => {
		const { code } = e

		if (['Enter', 'NumpadEnter'].includes(code)) {
			handleSubmit()
		}
	}

	return (
		<main className="background w-screen h-screen flex justify-center items-center">
			<div className="bg-white w-[clamp(200px,99vw-500px)] p-4 rounded-lg max-[420px]:px-1 border-gray-300 border shadow-xl">
				<div className="grid text-center">
					<span className="font-bold text-2xl">LOGIN</span>
					<span className="mt-5">
						Preencha os campos abaixo para realizar o Login
					</span>
				</div>

				<div className="mt-5">
					<InputField
						label="E-mail"
						placeholder="Digite seu email"
						value={inputValues.email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setInputValues({ ...inputValues, email: e.target.value })
						}
						onKeyDown={handleKeySubmit}
					/>

					<InputField
						type="password"
						label="Senha"
						placeholder="Digite sua senha"
						className="mt-5"
						value={inputValues.password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setInputValues({ ...inputValues, password: e.target.value })
						}
						onKeyDown={(e: React.KeyboardEvent) => handleKeySubmit(e)}
					/>

					<ButtonField
						ref={buttonRef}
						title="ENTRAR"
						className="mt-8"
						onClick={handleSubmit}
					/>
				</div>

				<div className="mt-5">
					<Link
						to="/register"
						className="text-blueCS font-bold cursor-pointer hover:text-blue-500">
						Ainda não tem uma conta?{' '}
						<span className="underline">Cadastre-se</span>
					</Link>
				</div>
			</div>
		</main>
	)
}

export default Login
