import { useState } from 'react'
import { chapters } from './data/chapters';
import { images } from './assets/images';
import { ImageWithCredit } from './components/ImageWithCredit'
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
		<div className="page">
			<main className="content">
				<div className="image-block">
					<ImageWithCredit
						src={imageSource ?? defaultImage}
						alt={`Illustration from Alice in Wonderland, chapter ${chapter.id}`}
						credit="Illustration by John Tenniel, 1865. Public domain."
					/>
				</div>
				<div className="read-the-book">
				<h1>Drink Me</h1>
				<p>
					{text}
				</p>
				</div>
				<div className="button-row">
					<button
						onClick={handleClick}
						className="inline-flex items-center
                   border-2 rounded-sm outline-double
                   border-pink-950
                    px-2 py-1 mt-2 mb-6
                   font-mono text-gray-900
                   bg-pink-100 shadow-lg shadow-pink-950/50"
					>
						Click me
					</button>
				</div>
				<footer className="button-row">
					<small>Built: {buildTime}</small>
				</footer>
			</main>
		</div>
	)
}

export default App
