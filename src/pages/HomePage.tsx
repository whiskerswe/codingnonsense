import { useEffect, useState } from "react";
import { ContentPage } from "../components/ContentPage.tsx";
import { getPage } from "../domain/content/pages.ts";
import { storyConfig } from "../domain/engine/storyConfig.ts";
import { useNavigate } from "react-router-dom";
import type { Page } from "../domain/models/page.ts";

export default function HomePage() {
	const navigate = useNavigate();
	
	const [page, setPage] = useState<Page | null>(null);
	
	function startStory() {
		navigate(`/chapter/book${storyConfig.startChapterId}`);
	}
	
	useEffect(() => {
		void (async () => {
			const p = await getPage("start");
			setPage(p);
		})();
	}, []);
	
	return (
		<ContentPage
			page={page ?? {
				id: "start",
				title: "Alice",
				body: "Nonsense is loading. Please wait...",
				image: "",
				image_width: 0,
				image_height: 0,
				button_text: "Start"
			}}
			onButtonClick={startStory}
		/>
	);
}