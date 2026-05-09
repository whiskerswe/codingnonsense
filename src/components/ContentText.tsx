import { Suspense } from "react";
import { renderMarkdown } from "../domain/ui/markdownRendered.ts";
import type { Page } from "../domain/models/page.ts";

export function ContentText({ page }: { page: Page }) {
	return (
		<div className="prose prose-sm lg:prose-base max-w-prose mx-auto px-10">
			<Title title={page.title} />
			<Suspense fallback={null}>
				<div
					dangerouslySetInnerHTML={{
						__html: renderMarkdown(page.body),
					}}
				/>
			</Suspense>
		</div>
	);
}

function Title({ title }: { title?: string }) {
	if (!title) {
		return (
			<div className="my-6 flex justify-center">
				<svg viewBox="0 0 140 10" className="w-120 h-2" aria-hidden="true">
					<rect x="0" y="4" width="140" height="1" fill="currentColor" />
				</svg>
			</div>
		);
	}
	
	return (
		<h1 className="text-center mb-0 font-serif font-light">
			{title}
		</h1>
	);
}