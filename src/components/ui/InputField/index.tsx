import React, { InputHTMLAttributes } from 'react'

type InputProps = {
	label: string
	ref?: React.Ref<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

function InputField({ label, ref, className, type, ...rest }: InputProps) {
	return (
		<div className={` ${className}`}>
			<label className="flex flex-col">
				{label}
				<input
					{...rest}
					type={`${type ? type : 'text'}`}
					ref={ref}
					className="p-1.5 bg-gray-300 rounded-sm border-b-2 outline-none"
				/>
			</label>
		</div>
	)
}

export default InputField
