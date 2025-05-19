import { Dispatch, SetStateAction } from 'react'

import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

type taskProps = {
	id: number
	content: string
	done: boolean
	cardId: number
}

type taskModalProps = {
	isOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	tasks: taskProps[]
}

function TaskCardModal({ isOpen, setModalOpen, tasks }: taskModalProps) {
	if (isOpen) {
		return (
			<div className="bg-ModalBg h-full flex justify-center items-center absolute w-screen top-0 left-0 z-10">
				<div className="bg-gray-100 w-3xl max-h-2/3 overflow-auto rounded-lg border-gray-500 flex flex-col justify-center items-center">
					<table
						width="100%"
						className="table-fixed text-center max-lg:table-auto">
						<thead className="bg-gray-300 ">
							<tr>
								<th className="rounded-bl-lg">ID</th>
								<th>Conteúdo</th>
								<th className="rounded-br-lg">Ações</th>
							</tr>
						</thead>

						<tbody>
							{tasks.map((task) => (
								<tr className="hover:bg-gray-200 border-t-1 border-gray-200">
									<td className="p-1">{task.id}</td>
									<td className="p-1">{task.content}</td>
									<td className="p-1">
										<button className="bg-gray-400 p-1 rounded-sm hover:bg-gray-500 cursor-pointer">
											<PencilSquareIcon className="size-5 text-white font-bold" />
										</button>
										<button className="bg-red-500 p-1 rounded-sm hover:bg-red-700 cursor-pointer ml-2">
											<TrashIcon className="size-5 text-white font-bold" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default TaskCardModal
