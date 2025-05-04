import { useRef, useState } from 'react'
import InputField from '../../components/ui/InputField'
import CardField from '../../components/ui/CardField'
import ButtonField from '../../components/ui/ButtonField'
import SideBarButton from '../../components/ui/SideBarButton'

import { HomeIcon } from '@heroicons/react/24/outline'

const arr = [
	{
		id: 1,
		content: 'alguma',
		done: false,
		cardId: 6,
	},
	{
		id: 2,
		content: 'coisinha',
		done: false,
		cardId: 6,
	},
	{
		id: 3,
		content: 'taskinho',
		done: false,
		cardId: 6,
	},
	{
		id: 4,
		content: 'La taska',
		done: false,
		cardId: 6,
	},
]

function ComponentsUsage() {
	const [active, setActive] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const handlebutton = () => {
		setActive(!active)
	}
	return (
		<div className="p-16">
			<ButtonField
				title="Botãozinho"
				ref={buttonRef}
			/>
			<CardField
				title="Titulinho"
				content="Conteudo pra caralho taligado mermão?"
				subtitle="Subititulinho"
				tasks={arr}
			/>

			<SideBarButton
				ref={buttonRef}
				title="PERFIL"
				className={`${active ? 'bg-amber-200' : ''} w-32 mx-auto`}
				onClick={handlebutton}>
				<HomeIcon className="size-8" />
			</SideBarButton>
		</div>
	)
}

export default ComponentsUsage
