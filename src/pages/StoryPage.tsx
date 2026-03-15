import { useState } from "react";
import { StoryEngine } from "../domain/storyEngine";
import { storyManifest } from "../domain/storyManifest";
import { chapters } from "../domain/chapters.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContentPage } from "../components/ContentPage.tsx";

interface StoryPageProps {
	onExit: () => void;
}

export function StoryPage({ onExit }: StoryPageProps) {
	const navigate = useNavigate();
	
	const [engine] = useState(
		() =>
			new StoryEngine({
				start: storyManifest.start,
				ending: storyManifest.ending,
				randomPool: storyManifest.randomPool,
				sequences: storyManifest.sequences,
			})
	);
	
	const [chapterIndex, setChapterIndex] = useState(
		() => engine.getCurrentChapter()
	);
	
	useEffect(() => {
		const isActive = sessionStorage.getItem("alice_story_active");
		
		if (!isActive) {
			navigate("/", { replace: true });
		}
	}, [navigate]);
	
	const chapter = chapters[chapterIndex];
	function handleClick() {
		if (engine.canAdvance()) {
			setChapterIndex(engine.nextChapter());
		}
		else {
			onExit();
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
