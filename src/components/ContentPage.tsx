import { ImageWithCredit } from "./ImageWithCredit.tsx";
import type { Page } from "../domain/models/page.ts";
import { AliceButton } from "./AliceButton.tsx";
import { Suspense, useState } from "react";
import { Footer } from "./Footer.tsx";
import { renderMarkdown } from "../domain/content/markdownRendered.ts";

interface Props {
	page: Page,
	onButtonClick?: () => void,
}

export function ContentPage( {page, onButtonClick}: Props ) {
	const [open, setOpen] = useState(false);
	console.log(page.body);
	if (!page.body) {
		return <div style={{ padding: 20 }}>Loading...</div>;
	}
	//const PageText = lazy(() => import("./PageText"));
	return (
		<main className="content px-4">
			<div className="content-inner">
			{page.image && (
				<div className="image-block" style={{ minHeight: "300px" }}>
					<div
						style={{
							aspectRatio: "3 / 2", // ungefär Tenniel
							width: "100%",
							maxWidth: 500
						}}
					>
					<ImageWithCredit image_src={page.image} image_width={page.image_width} image_height={page.image_height}/>
					</div>
				</div>
			)}
			<div className="prose inline-block w-auto max-w-full p-2">
				<h1 className="text-center font-serif font-light">{page.title}</h1>
				<Suspense fallback={null}>
					<div
						dangerouslySetInnerHTML={{
							__html: renderMarkdown(page.body),
						}}
					/>
				</Suspense>
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
