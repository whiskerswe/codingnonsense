import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useHome } from "../app/HomeContext.tsx";

export function Header()  {
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const home = useHome();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		}
		
		document.addEventListener("mousedown", handleClickOutside);
		
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	
	function goHome() {
		if (location.pathname !== "/") {
			navigate("/");
		}
		home.resetHome();
	}
	
	return (
		<header className="flex justify-between border-b border-gray-600">
			
			{/* Home */}
			<button
				onClick={goHome}
				aria-label="Home"
				className="w-10 h-10 flex items-center justify-center"
			>
				<img src="/spades.svg" alt="Spades" aria-hidden="true" className="w-6 h-6" />
			</button>
			
			{/* Menu */}
			<div ref={menuRef} className="relative">
				<button
					onClick={() => setOpen(!open)}
					aria-label="Menu"
					className="w-10 h-10 flex items-center justify-center text-xl"
				>
					☰
				</button>
				
				{open && (
					<div className="absolute right-0 bg-white text-black shadow-lg rounded-sm min-w-35">
						<Link
							to="/about"
							onClick={() => setOpen(false)}
							className="block p-2"
						>
							About
						</Link>
					</div>
				)}
			</div>
		</header>
	);
}
