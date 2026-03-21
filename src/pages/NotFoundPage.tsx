import { ContentPage } from "../components/ContentPage";
import { getPage } from "../domain/pages.ts";

export function NotFoundPage() {
	console.log("Rendering NotFoundPage");
	return (
		<ContentPage
			page={getPage("not_found")}
		/>
	);
}