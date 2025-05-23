import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import './Profile.css'

//components
import ButtonField from '../../components/ui/ButtonField'
import CardField from '../../components/ui/CardField'
import CardProfileField from '../../components/ui/CardProfileField'

type tasksProps = {
	id: number
	content: string
	done: boolean
	cardId: number
}

type cardsProps = {
	id: number
	title: string
	subtitle: string
	content: string
	done: boolean
	tasks: { id: number; content: string; done: boolean; cardId: number }[]
	authorId: number
}

type userProps = {
	id: number
	name: string
	email: string
	cards: cardsProps[]
}

function Profile() {
	const [user, setUser] = useState<userProps>()

	const [tasks, setTasks] = useState<tasksProps[]>([])
	const [inputValues, setInputValues] = useState({
		name: '',
		email: '',
	})

	const finishedCards = user?.cards.filter((card) => {
		if (card.done === true) {
			return card
		}
	})

	const finishedTasks = tasks.filter((task) => {
		if (task.done === true) {
			return task
		}
	})

	const getUser = async () => {
		const token = localStorage.getItem('token')
		const id = localStorage.getItem('userId')
		try {
			const { data } = await api.get(`/user/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			setUser(data)
			setInputValues({
				name: data.name ?? '',
				email: data.email ?? '',
			})
		} catch (e) {
			console.log(e)
		}
	}

	const getUserCards = async () => {
		const token = localStorage.getItem('token')
		const id = localStorage.getItem('userId')
		try {
			const { data } = await api.get(`/cards/user/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			const allTasks = data.flatMap((card: cardsProps) => card.tasks)
			setTasks(allTasks)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		getUser()
		getUserCards()
	}, [])
	return (
		<main className="w-full py-4 px-8 max-sm:px-2 bg-css max-lg:mt-10">
			<div className="grid grid-cols-2 gap-10 p-10 max-md:grid-cols-1 max-md:p-5">
				<div className="flex flex-col border border-gray-300 rounded-3xl shadow-lg p-5 items-center gap-10 bg-white">
					<div className="backgroundProfile h-64 w-64 rounded-full max-sm:w-56 max-sm:h-56"></div>

					<div className="flex flex-col gap-5 text-lg w-full p-2">
						<div className="w-full flex flex-col gap-1">
							<label htmlFor="name">Nome</label>
							<input
								type="text"
								name="name"
								id="name"
								value={inputValues.name}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setInputValues({ ...inputValues, name: e.target.value })
								}
								className="p-1 border-b border-gray-300 outline-none bg-gray-50 rounded-lg"
							/>
						</div>
						<div className="w-full flex flex-col gap-1">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								name="email"
								id="email"
								value={inputValues.email}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setInputValues({ ...inputValues, email: e.target.value })
								}
								className="p-1 border-b border-gray-300 outline-none bg-gray-50 rounded-lg"
							/>
						</div>
						<ButtonField title="Salvar" />
					</div>
				</div>

				<div className="flex flex-col gap-10">
					<div className="border border-gray-300 shadow-xl rounded-3xl bg-white p-5 flex flex-col gap-5">
						<CardProfileField
							title="Cards finalizados"
							subtitle={`${finishedCards ? finishedCards.length : null} de ${user?.cards.length}`}
							content={`Aqui está a quantidade de cards que foram finalizados por você`}
							cards={user?.cards}
						/>

						<div>
							<ButtonField
								title="Criar cards"
								onClick={() => (window.location.href = '/home')}
							/>
						</div>
					</div>

					<div className="border border-gray-300 rounded-3xl p-5 bg-white shadow-xl flex flex-col gap-5">
						<CardField
							title="Tasks finalizadas"
							subtitle={`${finishedTasks ? finishedTasks.length : null} de ${tasks.length}`}
							content={`Aqui está a quantidade de tasks que foram finalizadas por você`}
							tasks={tasks}
						/>

						<div>
							<ButtonField
								title="Ver Tasks Não Finalizadas"
								onClick={() => (window.location.href = '/home')}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Profile
