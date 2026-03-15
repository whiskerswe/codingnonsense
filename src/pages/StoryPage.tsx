import { useState } from "react";
import { StoryEngine } from "../domain/storyEngine";
import { storyManifest } from "../domain/storyManifest";
import { chapters } from "../domain/chapters";
import { useNavigate, useParams } from "react-router-dom";
import { ContentPage } from "../components/ContentPage";

export function StoryPage() {
	const navigate = useNavigate();
	const { chapterId } = useParams();
	
	const [engine] = useState(
		() =>
			new StoryEngine({
				start: storyManifest.start,
				ending: storyManifest.ending,
				randomPool: storyManifest.randomPool,
				sequences: storyManifest.sequences,
			})
	);
	
	const chapter = chapters.find(c => c.id === chapterId);
	
	if (!chapter) {
		return null;
	}
	
	function handleClick() {
		if (engine.canAdvance()) {
			const nextIndex = engine.nextChapter();
			const nextId = `book${nextIndex}`;
			
			navigate(`/chapter/${nextId}`);
		} else {
			navigate("/");
		}
	}
	
	return (
		<ContentPage
			page={{
				id: chapter.id,
				image: chapter.image,
				title: chapter.title,
				body: chapter.body,
				button_text: chapter.button_text
			}}
			onButtonClick={handleClick}
		/>
	);
}