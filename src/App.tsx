import { useRef, useState } from 'react'
import { ImageWithCredit } from './components/ImageWithCredit'
import { StoryEngine } from "./domain/storyEngine.ts";
import { storyManifest } from "./domain/storyManifest.ts";
import { chapters, resolveChapterImage } from "./data/chapters.ts";
import { getBuildTime } from "./env/buildInfo.ts";
import { Sentence } from "./components/Sentence.tsx";

function App() {
	const engine = useRef(
		new StoryEngine({
			start: storyManifest.start,
			ending: storyManifest.ending,
			randomPool: storyManifest.randomPool,
			sequences: storyManifest.sequences,
		})
	);
	const [chapterIndex, setChapterIndex] = useState(engine.current.getCurrentChapter());
	const chapter = chapters[chapterIndex];
	
	function handleClick() {
		setChapterIndex(engine.current.nextChapter());
	}
	
	return (
		<div className="page">
			<main className="content">
				<div className="image-block">
					<ImageWithCredit
						src={resolveChapterImage(chapter)}
						chapterId={chapter.id}
					/>
				</div>
				<div className="read-the-book">
				<h1>Drink Me</h1>
				<p>
					{chapter.sentences.map((sentence, i) => (
						<Sentence key={i} {...sentence} />
					))}
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
					<small>Built: {getBuildTime()}</small>
				</footer>
			</main>
		</div>
	)
}

export default App
