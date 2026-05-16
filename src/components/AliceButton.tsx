import * as React from "react";

interface AliceButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
}

export function AliceButton( {onClick, children}: AliceButtonProps ) {
	return (
		<div className="flex justify-center">
			<button
				type="button"
				onClick={onClick}
				className="inline-flex items-center
                   border-t border-l border-r-2 border-b-2
                   border-olive-600
                   py-1 px-2 mt-2 mb-4 shadow-xl
                   font-serif font-semibold
                   text-lg text-olive-700"
			>
				{children}
			</button>
		</div>
	);
}