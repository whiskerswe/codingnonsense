import { useState } from 'react'
import { chapters } from './data/chapters';
import { images } from './assets/images';
import { ImageWithCredit } from './components/ImageWithCredit'
import './App.css'
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
		<>
			<div className='image-content'><ImageWithCredit
				src={imageSource ?? defaultImage}
				alt={"Illustration from Alice in Wonderland, chapter $chapter.id}"}
				credit="Illustration by John Tenniel, 1865. Public domain."
			/></div>
			<p className="read-the-book">
				{text || ' '}
			</p>
			<div className="card">
				<button onClick={handleClick}>
					Click me
				</button>
			</div>
			<footer>
				<small>Built: {buildTime}</small>
			</footer>
		</>
	)
}

export default App
