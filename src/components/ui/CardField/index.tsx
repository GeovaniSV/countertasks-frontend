import { useState, useEffect } from 'react'
import { LinearProgress, LinearProgressProps, Box } from '@mui/material'

import './Card.css'

import { ClockIcon } from '@heroicons/react/24/outline'

type CardProps = {
	title: string
	subtitle?: string
	content?: string
	tasks?: { id: number; content?: string; done: boolean; cardId: number }[]
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

function CardField({ title, content, subtitle, tasks }: CardProps) {
	const [progressBar, setProgressBar] = useState(0)
	const [progress, setProgress] = useState('')
	const [screeTask, setScreenTask] = useState('')

	const handleProgressBar = () => {
		let taskDone: number = 0
		tasks!.map((task) => {
			if (task.done === true) {
				taskDone++
			}
		})

		const percentage: number = (taskDone * 100) / tasks!.length
		setProgressBar(Number(percentage.toFixed()))

		if (percentage >= 0 && percentage < 100) {
			setProgress('Em progresso')
		} else if (percentage == 100) {
			setProgress('Feito')
		} else {
			setProgress('Na fila')
		}
	}

	const handleTaskScreen = () => {}

	useEffect(() => {
		handleProgressBar()
		handleTaskScreen()
	}, [tasks])
	return (
		<div className="border border-gray-200 w-full shadow-lg rounded-lg p-2">
			<div className=" grid grid-cols-2">
				<div>
					<p>{title}</p>
					<p>{subtitle}</p>
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

export default CardField
