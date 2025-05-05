import React, { InputHTMLAttributes } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type InputProps = {
	label?: string
	ref: React.Ref<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

function SearchInputField({ label, ref, className, ...rest }: InputProps) {
	return (
		<div className={` ${className}`}>
			<label className="flex flex-col">
				{label}
				<div className="bg-gray-300 rounded-sm border-b-2 flex items-center shadow-lg">
					<div className="p-1.5">
						<MagnifyingGlassIcon className="size-5" />
					</div>
					<input
						{...rest}
						type="text"
						ref={ref}
						className="p-1.5 w-full outline-hidden"
					/>
				</div>
			</label>
		</div>
	)
}

export default SearchInputField
