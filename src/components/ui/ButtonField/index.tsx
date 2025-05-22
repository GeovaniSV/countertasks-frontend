import React, { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
	title: string
	className?: string
	ref?: React.Ref<HTMLButtonElement>
} & ButtonHTMLAttributes<HTMLButtonElement>

function ButtonField({ title, className, type, ref, ...rest }: ButtonProps) {
	return (
		<button
			{...rest}
			ref={ref}
			type={type ? type : 'button'}
			className={`${className} p-2 w-full bg-yellowCS rounded-md text-white font-bold hover:bg-orangeCS cursor-pointer`}>
			{title}
		</button>
	)
}

export default ButtonField
