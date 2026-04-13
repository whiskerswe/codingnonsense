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
	
	if (!chapterId) {
		return <Navigate to="/not-found" replace />;
	}
	
	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		async function load() {
			const found = await getChapter(chapterId!);
			
			if (isMounted) {
				setChapter(found);
				setLoading(false);
			}
		}
		
		void load();
		
		return () => {
			isMounted = false;
		};
	}, [chapterId]);
	
	const [engine] = useState(
		() =>
			new StoryEngine({
				start: storyManifest.start,
				ending: storyManifest.ending,
				randomPool: storyManifest.randomPool,
				sequences: storyManifest.sequences,
			})
	);
	
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