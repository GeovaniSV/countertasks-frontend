import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import './Register.css'

import InputField from '../../components/ui/InputField'
import ButtonField from '../../components/ui/ButtonField'

function Register() {
	const [inputValues, setInputValues] = useState({
		name: '',
		email: '',
		password: '',
	})

	const navigate = useNavigate()
	const buttonRef = useRef<HTMLButtonElement>(null)

	const handleSubmit = async () => {
		try {
			await api.post('/register', {
				name: inputValues.name,
				email: inputValues.email,
				password: inputValues.password,
			})
			navigate('/login')
		} catch (e) {
			console.log(e)
			alert('Dados incorretos')
		}
	}

	const handleKeySubmit = (e: React.KeyboardEvent) => {
		const { code } = e

		if (code === 'Enter') {
			handleSubmit()
		}
	}

	return (
		<main className="background w-screen h-screen flex justify-center items-center">
			<div className="bg-white w-[clamp(200px,99vw-500px)] p-4 rounded-lg  max-[420px]:px-1 border-gray-300 border shadow-xl">
				<div className="grid text-center">
					<span className="font-bold text-2xl">Cadastro</span>
					<span className="mt-5">
						Preencha os campos abaixo para realizar o cadastro
					</span>
				</div>

				<div>
					<InputField
						label="Nome"
						placeholder="Digite seu nome"
						value={inputValues.name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setInputValues({ ...inputValues, name: e.target.value })
						}
						onKeyDown={handleKeySubmit}
					/>
					<InputField
						label="E-mail"
						placeholder="Digite seu email"
						className="mt-5"
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
					<button
						onClick={() => (window.location.href = '/login')}
						className="text-blueCS font-bold cursor-pointer hover:text-blue-500">
						Já possui uma conta? <span className="underline">Entre aqui!</span>
					</button>
				</div>
			</div>
		</main>
	)
}

export default Register
