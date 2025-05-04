import { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
	title: string
	className?: string
	ref: React.Ref<HTMLButtonElement>
} & ButtonHTMLAttributes<HTMLButtonElement>

function SideBarButton({
	title,
	className,
	children,
	ref,
	...rest
}: ButtonProps) {
	return (
		<button
			{...rest}
			ref={ref}
			className={`${className} rounded-md flex p-2 gap-2 items-center justify-center font-bold text-xl cursor-pointer hover:bg-amber-200`}>
			<div>{children}</div>
			{title}
		</button>
	)
}

export default SideBarButton
