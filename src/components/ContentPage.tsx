import { ImageWithCredit } from "./ImageWithCredit.tsx";
import type { Page } from "../domain/models/page.ts";
import { AliceButton } from "./AliceButton.tsx";
import { useState } from "react";
import { Footer } from "./Footer.tsx";
import { ContentText } from "./ContentText.tsx";

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
		<main className="flex flex-col justify-center items-center bg-olive-200">
			<div className="max-w-xl mx-auto flex flex-col items-center bg-olive-50">
			{page.image && (
				<div className="flex justify-center">
					<ImageWithCredit image_src={page.image} image_width={page.image_width} image_height={page.image_height}/>
				</div>
			)}
			<div>
				<ContentText page={page}></ContentText>
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
