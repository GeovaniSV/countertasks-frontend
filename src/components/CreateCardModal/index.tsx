import React, { Dispatch, SetStateAction, useState, useRef } from 'react'
import { api } from '../../services/api'

import ButtonField from '../ui/ButtonField'
import InputField from '../ui/InputField'

type ModalProps = {
	isOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
}

type taskProps = {
	content: string
}

function Modal({ isOpen, setModalOpen }: ModalProps) {
	const [inputValues, setInputValues] = useState({
		title: '',
		subTitle: '',
		content: '',
		task: '',
	})
	const [tasks] = useState<taskProps[]>([])
	const taskInputRef = useRef<HTMLInputElement>(null)

	const taskSubmit = () => {
		const task = {
			content: '',
		}
		if (inputValues.task) {
			task.content = inputValues.task
		}

		if (task.content) {
			tasks.push(task)
		}

		setInputValues({ ...inputValues, task: '' })
		taskInputRef.current?.focus()
	}

	const modalSubmit = async () => {
		const token = localStorage.getItem('token')
		const authorId = localStorage.getItem('userId')
		try {
			api.post(
				'/cards',
				{
					title: inputValues.title,
					subtitle: inputValues.subTitle,
					content: inputValues.content,
					authorId: authorId,
					tasks: tasks,
				},
				{ headers: { Authorization: `Bearer ${token}` } },
			)
		} catch (e) {
			console.log(e)
		}

		setModalOpen(false)
	}

	const keyEvent = (e: React.KeyboardEvent) => {
		const { code } = e

		if (['Enter', 'NumpadEnter'].includes(code)) {
			taskSubmit()
		}
	}
	if (isOpen) {
		return (
			<div className="bg-ModalBg h-full flex justify-center items-center absolute w-screen top-0 left-0 z-10">
				<div className="bg-gray-100 w-96 p-4 rounded-lg border-gray-500 flex flex-col justify-center items-center">
					<span className="font-bold text-2xl">Crie seu card!</span>
					<form className="w-full flex flex-col gap-2">
						<InputField
							label="Titulo"
							placeholder="Digite o titulo aqui"
							value={inputValues.title}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setInputValues({ ...inputValues, title: e.target.value })
							}
						/>
						<InputField
							label="Subtitulo"
							placeholder="Digite o subtitulo aqui!"
							value={inputValues.subTitle}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setInputValues({ ...inputValues, subTitle: e.target.value })
							}
						/>
						<div>
							<label htmlFor="content">Conteúdo</label>
							<textarea
								name="content"
								id="content"
								className="w-full bg-gray-300 border-b-2 outline-none rounded-sm p-1.5"
								placeholder="Digite um resumo do card"
								value={inputValues.content}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
									setInputValues({ ...inputValues, content: e.target.value })
								}></textarea>
						</div>

						<InputField
							label="Tasks"
							ref={taskInputRef}
							placeholder="coloque uma Task por vez! Utilize 'Enter'"
							value={inputValues.task}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setInputValues({ ...inputValues, task: e.target.value })
							}
							onKeyDown={(e: React.KeyboardEvent) => keyEvent(e)}
						/>
					</form>

					<div className="w-full flex gap-5 mt-5">
						<ButtonField
							onClick={modalSubmit}
							title="Criar card"
						/>
						<button
							className="p-2 w-full bg-blueCS rounded-md text-white font-bold hover:bg-blueCSHover cursor-pointer"
							onClick={() => setModalOpen(false)}>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Modal
