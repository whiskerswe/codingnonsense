import { ContentPage } from "../components/ContentPage";
import { getPage } from "../domain/content/pages.ts";
import { useEffect, useState } from "react";
import type { Page } from '../domain/models/page.ts';

export default function AboutPage() {

	const [page, setPage] = useState<Page | null>(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		void (async () => {
			const p = await getPage("about");
			setPage(p);
			setLoading(false);
		})();
	}, []);
	
	if (loading || !page) {
		return <div>Loading...</div>;
	}
	
	return (
		<ContentPage
			page={page ?? {
				id: "about",
				title: "About Alice",
				body: "About nonsense is loading. Please wait...",
				image: "",
			}}
		/>
	);
}