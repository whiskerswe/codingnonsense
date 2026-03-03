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
                   border-1 outline-double
                   border-stone-950
                   px-2 py-1 mt-2 mb-6
                   font-mono text-gray-900
                   shadow-lg shadow-stone-950/50"
			>
				{children}
			</button>
		</div>
	);
}