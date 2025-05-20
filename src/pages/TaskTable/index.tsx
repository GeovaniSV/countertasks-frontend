import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { api } from '../../services/api'
//icons
import {
	PencilSquareIcon,
	TrashIcon,
	ChevronDoubleLeftIcon,
	ChevronLeftIcon,
	ChevronDoubleRightIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/outline'

type cardsProps = {
	id: number
	title: string
	subtitle: string
	content: string
	done: boolean
	tasks: []
	authorId: number
}

type taskProps = {
	id: number
	content: string
	done: boolean
	cardId: number
}

function TaskTable() {
	//na tela cabem até 11 tasks
	const [cards, setCards] = useState<cardsProps[]>([])
	const [tasks, setTasks] = useState<taskProps[]>([])
	const navigate = useNavigate()
	let params = useParams()

	//pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(13)
	const pagination = {
		totalPage: Math.ceil(tasks.length / perPage),
	}
	const lastIndex = currentPage * perPage
	const firstIndex = lastIndex - perPage
	const taskRevesed = tasks.slice(0).reverse()
	const tasksPagination = taskRevesed.slice(firstIndex, lastIndex)
	const totalItems = tasks.length

	const paginationControl = {
		next() {
			setCurrentPage(currentPage + 1)
			const lastPage = currentPage > pagination.totalPage
			if (lastPage) {
				setCurrentPage(currentPage - 1)
			}
		},
		prev() {
			setCurrentPage(currentPage - 1)
			const firstPage = currentPage < 1
			if (firstPage) {
				setCurrentPage(currentPage + 1)
			}
		},
		last() {
			setCurrentPage(pagination.totalPage)
		},
		first() {
			setCurrentPage(1)
		},
	}

	const getTasks = async () => {
		const token: any = localStorage.getItem('token')
		try {
			const data = await api.get(`/tasks/card/${params.id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			setTasks(data.data)
		} catch (e) {
			console.log(e)
		}
	}

	const handleDeleteTasks = async (id: number) => {
		const token = localStorage.getItem('token')
		try {
			await api.delete(`/tasks/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			getTasks()
		} catch (e) {
			console.log(e)
		}
	}

	const getCards = async () => {
		const token = localStorage.getItem('token')
		try {
			const { data } = await api.get('/cards', {
				headers: { Authorization: `Bearer ${token}` },
			})
			if (!data) {
				return
			} else {
				setCards(data)
			}
		} catch (e) {
			console.log(e)
		}
	}

	const handleDeleteCard = async () => {
		const token = localStorage.getItem('token')
		try {
			await api.delete(`/cards/${params.id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			navigate('/home')
		} catch (e) {
			console.log(e)
		}
	}

	const handleFinishCard = () => {
		const card = cards.filter((card) => {
			if (card.id === Number(params.id)) {
				return card
			}
		})
		const token: any = localStorage.getItem('token')
		tasks.forEach((task) => {
			if (task.done === false) {
				handleFinishTask(task.id)
			}
		})

		try {
			api.put(
				`/cards/${params.id}`,
				{
					title: card[0].title,
					subtitle: card[0].subtitle,
					content: card[0].content,
					done: true,
				},
				{ headers: { Authorization: `Bearer ${token}` } },
			)
			navigate('/home')
		} catch (e) {
			console.log(e)
		}
	}

	const handleFinishTask = async (id: number) => {
		const card = cards.filter((card) => {
			if (card.id === Number(params.id)) {
				return card
			}
		})

		const task = tasks.filter((task) => {
			if (task.id === id) {
				return task
			}
		})

		const token: any = localStorage.getItem('token')
		if (task[0].done === false) {
			try {
				await api.put(
					`/tasks/${id}`,
					{
						content: task[0].content,
						done: true,
					},
					{ headers: { Authorization: `Bearer ${token}` } },
				)
				getTasks()
			} catch (e) {
				console.log(e)
			}
		} else if (task[0].done === true) {
			if (card[0].done === true) {
				try {
					api.put(
						`/cards/${params.id}`,
						{
							title: card[0].title,
							subtitle: card[0].subtitle,
							content: card[0].content,
							done: false,
						},
						{ headers: { Authorization: `Bearer ${token}` } },
					)
				} catch (e) {
					console.log(e)
				}
			}
			try {
				await api.put(
					`/tasks/${id}`,
					{
						content: task[0].content,
						done: false,
					},
					{ headers: { Authorization: `Bearer ${token}` } },
				)
				getTasks()
			} catch (e) {
				console.log(e)
			}
		}
	}

	useEffect(() => {
		getCards()
		getTasks()
	}, [tasks.length])
	return (
		<main className="w-full py-4">
			<div className="px-8 ">
				<div className="flex justify-between ">
					<span className="font-medium text-4xl">Tasks</span>
					<div className="flex gap-5">
						<button
							onClick={() => handleDeleteCard()}
							className="flex w-56 bg-red-500 hover:bg-red-700 cursor-pointer items-center font-bold text-white justify-around shadow-lg rounded-sm p-1">
							<span>Deletar Card</span>
						</button>
						<button
							onClick={handleFinishCard}
							className="flex w-56 bg-blueCS hover:bg-blueCSHover cursor-pointer items-center font-bold text-white justify-around shadow-lg rounded-sm p-1">
							Finalizar Card
						</button>
					</div>
				</div>

				<div className="mt-4">
					<div className="flex gap-5 border-t mt-2 p-1 max-md:hidden">
						{tasks.length >= 10 && (
							<>
								<button
									className={`${currentPage === 1 ? 'bg-grayCS' : 'cursor-pointer'} p-1 hover:bg-graycs rounded-md border-2 border-grayCS`}
									onClick={paginationControl.first}
									disabled={currentPage === 1}>
									<ChevronDoubleLeftIcon className="size-5 text-gray-500" />
								</button>
								<button
									className={`${currentPage === 1 ? 'bg-grayCS' : 'cursor-pointer'} p-1 hover:bg-graycs rounded-md border-2 border-grayCS`}
									onClick={paginationControl.prev}
									disabled={currentPage === 1}>
									<ChevronLeftIcon className="size-5 text-gray-500" />
								</button>
								<button
									className={`${currentPage === pagination.totalPage ? 'bg-grayCS' : 'cursor-pointer'} p-1 hover:bg-graycs  rounded-md border-2 border-grayCS`}
									onClick={paginationControl.next}
									disabled={currentPage === pagination.totalPage}>
									<ChevronRightIcon className="size-5 text-gray-500" />
								</button>
								<button
									className={`${currentPage === pagination.totalPage ? 'bg-grayCS' : 'cursor-pointer'} p-1 hover:bg-graycs  rounded-md border-2 border-grayCS`}
									onClick={paginationControl.last}
									disabled={currentPage === pagination.totalPage}>
									<ChevronDoubleRightIcon className="size-5 text-gray-500" />
								</button>
							</>
						)}
						<div className="flex items-center gap-5 justify-between w-full text-gray-500">
							<span>
								Pagina atual {tasks.length ? currentPage : '0'} de{' '}
								{pagination.totalPage}
							</span>
							<span>Total de {totalItems} items</span>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-2">
				<table
					width="100%"
					className="text-center ">
					<thead className="bg-gray-300 ">
						<tr>
							<th>ID</th>
							<th>Conteúdo</th>
							<th>Ações</th>
						</tr>
					</thead>

					<tbody className="max-md:hidden">
						{tasksPagination.map((task) => (
							<tr
								className="hover:bg-gray-200 border-b-1 border-gray-200"
								key={task.id}>
								<td className="p-1">
									{task.done ? (
										<button
											onClick={() => handleFinishTask(task.id)}
											className="bg-blueCS p-1 rounded-md text-sm text-white font-bold hover:bg-blueCSHover cursor-pointer">
											Finalizado
										</button>
									) : (
										<button
											onClick={() => handleFinishTask(task.id)}
											className="bg-yellowCS p-1 rounded-md text-sm text-white font-bold hover:bg-orangeCS cursor-pointer">
											Finalizar
										</button>
									)}
								</td>
								<td className="p-1">{task.content}</td>
								<td className="p-1">
									<button className="bg-gray-400 p-1 rounded-sm hover:bg-gray-500 cursor-pointer">
										<PencilSquareIcon className="size-5 text-white font-bold" />
									</button>
									<button
										className="bg-red-500 p-1 rounded-sm hover:bg-red-700 cursor-pointer ml-2"
										onClick={() => handleDeleteTasks(task.id)}>
										<TrashIcon className="size-5 text-white font-bold" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
					<tbody className="md:hidden">
						{taskRevesed.map((task) => (
							<tr
								className="hover:bg-gray-200 border-b-1 border-gray-200"
								key={task.id}>
								<td className="p-1">
									<input
										type="checkbox"
										name="checkTask"
										id="checkTasks"
									/>
								</td>
								<td className="p-1">{task.content}</td>
								<td className="p-1">
									<button className="bg-gray-400 p-1 rounded-sm hover:bg-gray-500 cursor-pointer">
										<PencilSquareIcon className="size-5 text-white font-bold" />
									</button>
									<button
										className="bg-red-500 p-1 rounded-sm hover:bg-red-700 cursor-pointer ml-2"
										onClick={() => handleDeleteTasks(task.id)}>
										<TrashIcon className="size-5 text-white font-bold" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	)
}

export default TaskTable
