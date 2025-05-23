import { useEffect, useState } from 'react'
import SearchBar from '../../components/ui/SearchBarField'
import CardField from '../../components/ui/CardField'
import Modal from '../../components/CreateCardModal'

//Api
import { api } from '../../services/api'

//icons
import {
	PlusIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

type cardsProps = {
	id: number
	title: string
	subtitle: string
	content: string
	done: boolean
	tasks: []
	authorId: number
}

function Home() {
	const [cards, setCards] = useState<cardsProps[]>([])
	const [openCreateModal, setOpenCreateModal] = useState(false)

	//pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(9)
	const pagination = {
		totalPage: Math.ceil(cards.length / perPage),
	}
	const lastIndex = currentPage * perPage
	const firstIndex = lastIndex - perPage
	const cardsUnfinished = cards.filter((card) => {
		if (card.done === false) {
			return card
		}
	})
	let totalItems = cardsUnfinished.length
	const cardsReversed = cardsUnfinished.slice(0).reverse()
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

	async function getCards() {
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
	}, [openCreateModal, Modal])

	return (
		<main className="w-full py-4 px-8 max-sm:px-2 max-lg:mt-20 max-md:mt-16">
			<Modal
				isOpen={openCreateModal}
				setModalOpen={() => setOpenCreateModal(false)}
			/>

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
							<span>Total de {totalItems} cards</span>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-3 max-md:hidden">
				{cardsPagination.map((card) =>
					card.done === true ? null : (
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
					card.done === true ? null : (
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

export default Home
