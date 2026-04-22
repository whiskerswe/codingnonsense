import { useEffect, useState } from "react";
import { StoryEngine } from "../domain/storyEngine";
import { storyManifest } from "../domain/storyManifest";
import { getChapter } from "../domain/chapters";
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
				start: storyManifest.start,
				ending: storyManifest.ending,
				numberOfChapters: storyManifest.numberOfChapters,
				randomPool: storyManifest.randomPool,
				sequences: storyManifest.sequences,
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
	
	if (!chapter || !chapter.page.body) {
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
			page={chapter.page}
			onButtonClick={handleClick}
		/>
	);
}
