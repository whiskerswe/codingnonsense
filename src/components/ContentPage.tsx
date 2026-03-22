import { ImageWithCredit } from "./ImageWithCredit.tsx";
import type { Page } from "../domain/models/page.ts";
import { AliceButton } from "./AliceButton.tsx";
import { PageText } from "./PageText.tsx";
import { useState } from "react";
import { Footer } from "./Footer.tsx";

interface Props {
	page: Page,
	onButtonClick?: () => void,
}

export function ContentPage( {page, onButtonClick}: Props ) {
	const [open, setOpen] = useState(false);
	if (!page.body) {
		return <div style={{ padding: 20 }}>Loading...</div>;
	}
	return (
		<main className="content px-4">
			<div className="content-inner">
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
				<PageText body={page.body}/>
			</div>
			{onButtonClick && (
				<AliceButton onClick={onButtonClick}>
					{page.button_text ?? "Click me"}
				</AliceButton>
			)}
			<Footer onClick={() => setOpen(true)} open={open} onClick1={() => setOpen(false)}
					onClick2={( e ) => e.stopPropagation()}/>
			</div>
			</main>
	);
}