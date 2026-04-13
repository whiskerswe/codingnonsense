import { ContentPage } from "../components/ContentPage";
import { getPage } from "../domain/pages.ts";
import { useEffect, useState } from "react";

export default function AboutPage() {

	const [page, setPage] = useState<any>(null);
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