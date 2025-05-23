import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/ui/SearchBarField'
import CardField from '../../components/ui/CardField'
import Modal from '../../components/Modal'
import InputField from '../../components/ui/InputField'

//Api
import { api } from '../../services/api'

//icons
import {
	PlusIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	PaperAirplaneIcon,
} from '@heroicons/react/24/outline'

type taskProps = {
	content: string
}

type cardsProps = {
	id: number
	title: string
	subtitle: string
	content: string
	done: boolean
	tasks: []
	authorId: number
}

function History() {
	const [cards, setCards] = useState<cardsProps[]>([])
	const [openCreateModal, setOpenCreateModal] = useState(false)

	const [renderUseEffect, setRenderUseEffect] = useState(0)
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
		if (renderUseEffect < 1) {
			setRenderUseEffect(renderUseEffect + 1)
		} else {
			setRenderUseEffect(renderUseEffect - 1)
		}
		setOpenCreateModal(false)
	}

	const keyEvent = (e: React.KeyboardEvent) => {
		const { code } = e

		if (['Enter', 'NumpadEnter'].includes(code)) {
			taskSubmit()
		}
	}

	//pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(9)

	const pagination = {
		totalPage: Math.ceil(cards.length / perPage),
	}
	const lastIndex = currentPage * perPage
	const firstIndex = lastIndex - perPage
	const cardsFinished = cards.filter((card) => {
		if (card.done === true) {
			return card
		}
	})
	let totalItems = cardsFinished.length
	const cardsReversed = cardsFinished.slice(0).reverse()
	const cardsPagination = cardsReversed.slice(firstIndex, lastIndex)

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

	useEffect(() => {
		getCards()
	}, [openCreateModal, Modal, renderUseEffect])

	return (
		<main className="w-full py-4 px-8 max-sm:px-2 max-lg:mt-20 max-md:mt-16">
			<Modal
				isOpen={openCreateModal}
				setModalOpen={() => setOpenCreateModal(false)}
				title="Crie seu card!"
				buttonTitle="Criar card"
				func={modalSubmit}>
				<div className="w-full flex flex-col gap-2">
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

					<label htmlFor="tasks">Tasks</label>
					<div className="w-full flex">
						<input
							type="text"
							name="tasks"
							id="tasks"
							className="p-1.5 w-full bg-gray-300 rounded-l-sm border-b-2 outline-none"
							placeholder={`Uma Task por vez! ${window.screen.width < 1024 ? 'Clique no botão >>' : 'Utilize "Enter"'}`}
							value={inputValues.task}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setInputValues({ ...inputValues, task: e.target.value })
							}
							onKeyDown={(e: React.KeyboardEvent) => keyEvent(e)}
						/>
						<button
							onClick={taskSubmit}
							className="p-1.5 border-b-2 bg-gray-300 rounded-r-sm">
							<PaperAirplaneIcon className="size-5" />
						</button>
					</div>
				</div>
			</Modal>

			<div>
				<div className="flex justify-between max-sm:flex-col">
					<span className="font-medium text-4xl">Cards</span>
					<button
						className="flex w-56 bg-yellowCS hover:bg-orangeCS cursor-pointer items-center font-bold text-white justify-around shadow-lg rounded-sm p-1"
						onClick={() => setOpenCreateModal(true)}>
						<PlusIcon className="size-5" />
						<span>CRIAR UM NOVO CARD</span>
					</button>
				</div>

				<div className="mt-4">
					<SearchBar
						className="w-72 max-md:hidden"
						placeholder="Pesquisar card"
					/>

					<div className="flex gap-5 border-t mt-2 p-1 max-md:hidden">
						{cards.length >= 10 && (
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
								Pagina atual {cards.length ? currentPage : '0'} de{' '}
								{pagination.totalPage}
							</span>
							<span>Total de {totalItems} items</span>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-3 max-md:hidden">
				{cardsPagination.map((card) =>
					card.done === false ? null : (
						<Link
							className="cursor-pointer hover:bg-gray-100 rounded-lg"
							to={`/card/${card.id}`}
							key={card.id}>
							<CardField
								title={card.title}
								subtitle={card.subtitle}
								content={card.content}
								tasks={card.tasks}
							/>
						</Link>
					),
				)}
			</div>

			<div className="flex flex-col gap-5 md:hidden overflow-auto max-h-screen">
				{cardsReversed.map((card) =>
					card.done === false ? null : (
						<Link
							className="cursor-pointer hover:bg-gray-100 rounded-lg"
							to={`/card/${card.id}`}
							key={card.id}>
							<CardField
								title={card.title}
								subtitle={card.subtitle}
								content={card.content}
								tasks={card.tasks}
							/>
						</Link>
					),
				)}
			</div>
		</main>
	)
}

export default History
