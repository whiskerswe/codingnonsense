import { useEffect, useState } from "react";
import { StoryEngine } from "../domain/engine/storyEngine.ts";
import { storyConfig } from "../domain/engine/storyConfig.ts";
import { getChapter } from "../domain/content/chapters.ts";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ContentPage } from "../components/ContentPage";

export default function StoryPage() {
	
	const navigate = useNavigate();
	const { chapterId } = useParams();
	const [, setTick] = useState(0);
	const [chapter, setChapter] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	
	
	const [engine] = useState(
		() =>
			new StoryEngine({
				startChapterId: storyConfig.startChapterId,
				endChapterIds: storyConfig.endChapterIds,
				maxNumberOfChapters: storyConfig.maxNumberOfChapters,
				randomChapterPool: storyConfig.randomChapterPool,
				chapterSequences: storyConfig.chapterSequences,
			})
	);
	
	useEffect(() => {
		if (!chapterId) {
			navigate("/not-found", { replace: true });
			return;
		}
		
		let cancelled = false;
		
		async function load() {
			setLoading(true);
			const found = await getChapter(chapterId!);
			
			if (!cancelled) {
				setChapter(found);
				setLoading(false);
			}
		}
		
		void load();
		
		return () => {
			cancelled = true;
		};
	}, [chapterId, navigate]);
	
	if (loading) {
		return <div>Loading...</div>;
	}
	
	if (!chapter || !chapter.body) {
		return <Navigate to="/not-found" replace />;
	}
	
	function handleClick() {
		if (engine.canAdvance()) {
			const nextIndex = engine.nextChapter();
			const nextId = `book${nextIndex}`;
			setTick(t => t + 1);
			navigate(`/chapter/${nextId}`);
		} else {
			navigate("/");
		}
	}
	
	return (
		<ContentPage
			page={chapter}
			onButtonClick={handleClick}
		/>
	);
}
