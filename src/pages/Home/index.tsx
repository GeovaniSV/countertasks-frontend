import { useRef } from 'react'
import SearchBar from '../../components/ui/SearchBarField'
import CardField from '../../components/ui/CardField'

//icons
import { PlusIcon } from '@heroicons/react/24/outline'

const arr = [
	{
		id: 1,
		content: 'alguma',
		done: false,
		cardId: 6,
	},
]

function Home() {
	const inputRef = useRef<HTMLInputElement>(null)
	return (
		<main className="w-full py-6 px-15">
			<div>
				<div className="flex justify-between">
					<span className="font-medium text-4xl">Tasks</span>
					<button className="flex w-56 bg-yellowCS hover:bg-orangeCS cursor-pointer items-center font-bold text-white justify-around shadow-lg rounded-sm p-1">
						<PlusIcon className="size-5" />
						<span>CRIAR UM NOVO CARD</span>
					</button>
				</div>

				<div className="mt-4">
					<div className="flex gap-5 font-bold text-lg">
						<span>Todos</span>
						<span>seção 1</span>
					</div>
					<div className="border-t py-5">
						<SearchBar
							ref={inputRef}
							className="w-72"
							placeholder="Pesquisar card"
						/>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-3">
				<CardField
					title="Card1"
					subtitle="Cardinho"
					content="Resumo, até demais"
					tasks={arr}
				/>
				<CardField
					title="Card1"
					subtitle="Cardinho"
					content="Resumo, até demais"
					tasks={arr}
				/>
				<CardField
					title="Card1"
					subtitle="Cardinho"
					content="Resumo, até demais"
					tasks={arr}
				/>
				<CardField
					title="Card1"
					subtitle="Cardinho"
					content="Resumo, até demais"
					tasks={arr}
				/>
				<CardField
					title="Card1"
					subtitle="Cardinho"
					content="Resumo, até demais"
					tasks={arr}
				/>
				<CardField
					title="Card1"
					subtitle="Cardinho"
					content="Resumo, até demais"
					tasks={arr}
				/>
				<CardField
					title="Card1"
					subtitle="Cardinho"
					content="Resumo, até demais"
					tasks={arr}
				/>
				<CardField
					title="Card1"
					subtitle="Cardinho"
					content="Resumo, até demais"
					tasks={arr}
				/>
				<CardField
					title="Card1"
					subtitle="Cardinho"
					content="Resumo, até demais"
					tasks={arr}
				/>
			</div>
		</main>
	)
}

export default Home
