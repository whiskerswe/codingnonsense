import { ImageWithCredit } from "./ImageWithCredit.tsx";
import { Sentence } from "./Sentence.tsx";
import type { Page } from "../domain/models/page.ts";
import { AliceButton } from "./AliceButton.tsx";
import { getBuildTime } from "../app/buildInfo.ts";

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
				{page.sentences.map((sentence, i) => (
					<Sentence key={i} {...sentence} />
				))}
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