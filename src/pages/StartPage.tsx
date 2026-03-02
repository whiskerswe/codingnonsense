import { ContentPage } from "../components/ContentPage";
import { getPage } from "../domain/pages.ts";

interface StartPageProps {
	onStart: () => void;
}

export function StartPage({ onStart }: StartPageProps) {
	return (
		<ContentPage
			page={getPage("start")}
			onButtonClick={onStart}
		/>
	);
}