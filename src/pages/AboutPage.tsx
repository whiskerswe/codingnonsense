import { ContentPage } from "../components/ContentPage";
import { getPage } from "../domain/pages.ts";

export function AboutPage() {
	
	return (
		<ContentPage
			page={getPage("about")}
		/>
	);
}