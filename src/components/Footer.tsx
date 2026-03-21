import { getBuildTime } from "../app/buildInfo.ts";

export function Footer( props: { onClick: () => void, open: boolean, onClick1: () => void, onClick2: ( e: any ) => void } ) {
	return <>
		<footer className="m-3 flex gap-4 justify-center text-sm">
			<span>Build: {getBuildTime()}</span>
			<button
				className="underline cursor-pointer"
				onClick={props.onClick}
			>
				Privacy
			</button>
		</footer>
		{props.open && (
			<div
				className="fixed inset-0 bg-black/40 flex items-center justify-center"
				onClick={props.onClick1}
			>
				<div
					className="bg-white p-5 max-w-sm border border-gray-300"
					onClick={props.onClick2}
				>
					<p className="text-sm">
						No tracking is used on this site.
						Not by design — it simply hasn’t been implemented.
					</p>
				</div>
			</div>
		)}
	</>;
}