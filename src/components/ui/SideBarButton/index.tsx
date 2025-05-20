import { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
	title: string
	className?: string
	to: string
	ref: React.Ref<HTMLAnchorElement>
} & AnchorHTMLAttributes<HTMLAnchorElement>

function SideBarButton({
	title,
	className,
	to,
	children,
	ref,
	...rest
}: ButtonProps) {
	return (
		<Link
			{...rest}
			ref={ref}
			to={to}
			className={`${className} rounded-md flex p-2 w-full gap-2 items-center font-bold text-lg cursor-pointer hover:bg-amber-200`}>
			<div>{children}</div>
			{title}
		</Link>
	)
}

export default SideBarButton
