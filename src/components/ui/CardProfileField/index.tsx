import { useState, useEffect } from 'react'
import { LinearProgress, LinearProgressProps, Box } from '@mui/material'

import './Card.css'

import { ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

type CardProps = {
	title: string
	subtitle?: string
	content?: string
	cards?: {
		id: number
		title: string
		subtitle: string
		content: string
		done: boolean
		tasks: { id: number; content: string; done: boolean; cardId: number }[]
		authorId: number
	}[]
}

function ProgressBar(props: LinearProgressProps & { value: number }) {
	return (
		<Box sx={{ width: '100%', mr: 1 }}>
			<LinearProgress
				variant="determinate"
				color="inherit"
				className="p-1 rounded-sm color"
				{...props}
			/>
		</Box>
	)
}

function CardProfileField({ title, content, subtitle, cards }: CardProps) {
	const [progressBar, setProgressBar] = useState(0)
	const [progress, setProgress] = useState('')
	const [screeTask] = useState('')
	const cardsLength = cards ? cards.length : 0

	const handleProgressBar = () => {
		let taskDone: number = 0
		cards
			? cards.map((task) => {
					if (task.done === true) {
						taskDone++
					}
				})
			: null

		const percentage: number = (taskDone * 100) / cardsLength
		setProgressBar(Number(percentage.toFixed()))

		if (percentage >= 0 && percentage < 100) {
			setProgress('Em progresso')
		} else if (percentage == 100) {
			setProgress('Feito')
		} else {
			setProgress('Na fila')
		}
	}

	const handlecardscreen = () => {}

	useEffect(() => {
		handleProgressBar()
		handlecardscreen()
	}, [cards])
	return (
		<div className="border border-gray-200 w-full shadow-lg rounded-lg p-2">
			<div className="grid grid-cols-2">
				<div className="flex flex-col items-start ">
					<p>{title}</p>
					<p className="flex items-center gap-1">
						<CheckCircleIcon className="size-5" />
						{subtitle}
					</p>
					<p className="flex items-center gap-1">
						<ClockIcon className="size-5" />
						{progress}
					</p>
				</div>

				<div className="max-h-24 overflow-y-auto">{content}</div>
			</div>

			<div className="mt-2">
				<ProgressBar value={progressBar} />
			</div>
			<div className="flex justify-between">
				<span>{screeTask}</span>
				<span>{progressBar}%</span>
			</div>
		</div>
	)
}

export default CardProfileField
