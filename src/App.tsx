import { useState } from 'react'
import { chapters } from './data/chapters';
import { images } from './assets/images';
import { ImageWithCredit } from './components/ImageWithCredit'
//import './App.css'
//import "./styles/main.css";
import { joinSentences } from "./domain/chapterText.ts";
import defaultImage from './assets/tenniel/1book3.jpg';


function App() {
	// @ts-ignore
	const [count, setCount] = useState(0);
	const drinkMeChapter = chapters[3];
	const longNeckChapter = chapters[4];
	const [chapter, setChapter] = useState(drinkMeChapter);
	const imageSource = chapter.image ? images[chapter.image] : undefined;
	const text = joinSentences(chapter.sentences);
	const buildTime = import.meta.env.VITE_BUILD_TIME
		? new Date(import.meta.env.VITE_BUILD_TIME).toLocaleString()
		: "2026";
	
	function handleClick() {
		setCount(( c ) => {
			const next = c + 1;
			setChapter(next % 2 == 0 ? drinkMeChapter : longNeckChapter);
			return next;
		});
	}
	
	return (
		<div className="min-h-screen bg-stone-50 flex justify-center">
			<main className="max-w-prose w-full">
				<div className="flex justify-center text-right my-8">
					<ImageWithCredit
						src={imageSource ?? defaultImage}
						alt={`Illustration from Alice in Wonderland, chapter ${chapter.id}`}
						credit="Illustration by John Tenniel, 1865. Public domain."
					/>
				</div>
				<p className="text-center mt-10 h-30">
					{text}
				</p>
				
				<div className="flex justify-center my-8">
					<button
						onClick={handleClick}
						className="inline-flex items-center
                   rounded-md border-2 ring-cyan-950
                   bg-white px-4 py-2
                   text-sm font-bold text-gray-900"
					>
						Click me
					</button>
				</div>
			</main>
			<footer>
				<small>Built: {buildTime}</small>
			</footer>
		</div>
	)
}

export default App
