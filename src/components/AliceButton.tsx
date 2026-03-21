import * as React from "react";

interface AliceButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
}

export function AliceButton({ onClick, children }: AliceButtonProps) {
	return (
		<div className="button-row">
			<button
				type="button"
				onClick={onClick}
				className="inline-flex items-center
                   border outline outline-offset-2
                   border-stone-800
                   px-2 pb-1 m-4 shadow-xl
                   text-base text-gray-900"
			>
				{children}
			</button>
		</div>
	);
}