import React, { Dispatch, ReactNode, SetStateAction } from 'react'

import ButtonField from '../ui/ButtonField'

type ModalProps = {
	isOpen: boolean
	children: ReactNode
	setModalOpen: Dispatch<SetStateAction<boolean>>
	createCard?: VoidFunction
}

function Modal({ children, isOpen, setModalOpen, createCard }: ModalProps) {
	if (isOpen) {
		return (
			<div className="bg-ModalBg h-full flex justify-center items-center absolute w-screen top-0 left-0 z-10">
				<div className="bg-gray-100 w-96 p-4 rounded-lg border-gray-500 flex flex-col justify-center items-center">
					{children}

					<div className="w-full flex gap-5 mt-5">
						<ButtonField
							onClick={createCard}
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
