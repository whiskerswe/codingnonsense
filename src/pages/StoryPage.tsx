import { useEffect, useState } from "react";
import { StoryEngine } from "../domain/engine/storyEngine.ts";
import { storyConfig } from "../domain/engine/storyConfig.ts";
import { getChapter } from "../domain/content/chapters.ts";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ContentPage } from "../components/ContentPage";
import type { Chapter } from "../domain/models/chapter.ts";

export default function StoryPage() {
	
	const navigate = useNavigate();
	const {chapterId} = useParams();
	const [chapter, setChapter] = useState<Chapter | null | undefined>(undefined);
	
	const [engine] = useState(
		() =>
			new StoryEngine(storyConfig)
	);
	
	useEffect(() => {
		if (!chapterId) {
			setChapter(null);
			return;
		}
		
		let cancelled = false;
		
		async function load() {
			const found = await getChapter(chapterId!);
			
			if (!cancelled) {
				setChapter(found ?? null);
			}
		}
		
		void load();
		
		return () => {
			cancelled = true;
		};
	}, [chapterId]);
	
	if (chapter === undefined) { //Loading
		return null;
	}
	
	if (!chapter || !chapter.body) {
		return <Navigate to="/not-found" replace/>;
	}
	
	function handleClick() {
		if (engine.canAdvance()) {
			const nextId = `book${engine.nextChapter()}`;
			navigate(`/chapter/${nextId}`);
		} else {
			navigate("/end");
		}
	}
	
	return (
		<ContentPage
			page={chapter}
			onButtonClick={handleClick}
		/>
	);
}
