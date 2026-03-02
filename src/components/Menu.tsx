import { useState } from "react";
import { Link } from "react-router-dom";

export function Menu() {
	const [open, setOpen] = useState(false);
	
	return (
		<div className="relative">
			<button
				onClick={() => setOpen(!open)}
				aria-label="Menu"
			>
				☰
			</button>
			
			{open && (
				<div className="absolute right-0 mt-2 bg-white shadow-md">
					<Link to="/about">About</Link>
					<Link to="/privacy">Privacy</Link>
				</div>
			)}
		</div>
	);
}