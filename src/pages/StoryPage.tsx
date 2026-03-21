import { useState } from "react";
import { StoryEngine } from "../domain/storyEngine";
import { storyManifest } from "../domain/storyManifest";
import { chapters } from "../domain/chapters";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ContentPage } from "../components/ContentPage";

export function StoryPage() {
	
	const navigate = useNavigate();
	const { chapterId } = useParams();
	
	if (!chapterId) {
		return <Navigate to="/not-found" replace />;
	}
	
	const chapter = chapters.find(c => c.id === chapterId);
	if (!chapter || !chapter.body) {
		return <Navigate to="/not-found" replace />;
	}
	
	const [engine] = useState(
		() =>
			new StoryEngine({
				start: storyManifest.start,
				ending: storyManifest.ending,
				randomPool: storyManifest.randomPool,
				sequences: storyManifest.sequences,
			})
	);
	
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