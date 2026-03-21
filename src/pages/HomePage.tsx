import { ContentPage } from "../components/ContentPage";
import { getPage } from "../domain/pages.ts";
import { useNavigate } from "react-router-dom";
import { storyManifest } from "../domain/storyManifest.ts";

export function HomePage() {
	const navigate = useNavigate();
	console.log("Rendering HomePage");
	function startStory() {
		navigate(`/chapter/book${storyManifest.start}`);
	}
	
	return (
		<ContentPage
			page={getPage("start")}
			onButtonClick={startStory}
		/>
	);
}