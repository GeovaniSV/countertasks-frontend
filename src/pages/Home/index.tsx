//icons
import { PlusIcon } from '@heroicons/react/24/outline'

function Home() {
	return (
		<main className="w-full py-8 px-15">
			<div>
				<div className="flex justify-between">
					<span className="font-medium text-4xl">Tasks</span>
					<button className="flex w-56 bg-yellowCS hover:bg-orangeCS cursor-pointer items-center font-bold text-white justify-around shadow-lg rounded-sm p-1">
						<PlusIcon className="size-5" />
						<span>CRIAR UM NOVO CARD</span>
					</button>
				</div>

				<div className="mt-5">
					<div className="flex gap-5 font-bold text-lg">
						<span>Todos</span>
						<span>seção 1</span>
					</div>
					<div className="border-t py-5">
						<input
							type="text"
							className="w-56 rounded-md p-1 bg-gray-300"
							placeholder="Pesquise"
						/>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Home
