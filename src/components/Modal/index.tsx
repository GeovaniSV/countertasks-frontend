import { Dispatch, SetStateAction, ReactNode } from 'react'

import ButtonField from '../ui/ButtonField'

type ModalProps = {
	isOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	title: string
	buttonTitle: string
	func: VoidFunction
	children: ReactNode
}

function Modal({
	isOpen,
	setModalOpen,
	title,
	buttonTitle,
	func,
	children,
}: ModalProps) {
	if (isOpen) {
		return (
			<div className="bg-ModalBg h-full flex justify-center items-center absolute w-screen top-0 left-0 z-40">
				<div className="bg-gray-100 w-96 p-4 rounded-lg border-gray-500 flex flex-col justify-center items-center">
					<span className="font-bold text-2xl">{title}</span>
					{children}
					<div className="w-full flex gap-5 mt-5">
						<ButtonField
							onClick={func}
							title={buttonTitle}
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
