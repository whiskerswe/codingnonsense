import { ImageWithCredit } from "./ImageWithCredit.tsx";
import type { Page } from "../domain/models/page.ts";
import { AliceButton } from "./AliceButton.tsx";
import { getBuildTime } from "../app/buildInfo.ts";
import { PageText } from "./PageText.tsx";

interface Props {
	page: Page;
	onButtonClick?: () => void;
}

export function ContentPage({ page, onButtonClick }: Props) {
	return (
		<main className="content">
			{page.image && (
				<div className="image-block">
					<ImageWithCredit
						src={page.image}
						chapterId={page.id}
					/>
				</div>
			)}
			<div className="read-the-book">
				<h1>{page.title}</h1>
				<PageText body={page.body} />
			</div>
			{onButtonClick && (
				<AliceButton onClick={onButtonClick}>
					{page.button_text ?? "Click me"}
				</AliceButton>
			)}
			<footer className="build-info">
				Build: {getBuildTime()}
			</footer>
		</main>
	);
}