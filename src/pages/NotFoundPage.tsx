import { ContentPage } from "../components/ContentPage";
import { getPage } from "../domain/pages.ts";
import { useEffect, useState } from "react";

export function NotFoundPage() {
	
	const [page, setPage] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		void (async () => {
			const p = await getPage("not_found");
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
				id: "not_found",
				title: "404",
				body: "Not found page cannot be found",
				image: "",
			}}
		/>
	);
}