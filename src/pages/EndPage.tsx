import { ContentPage } from "../components/ContentPage";
import { getPage } from "../domain/content/pages.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EndPage() {
	const navigate = useNavigate();
	const [page, setPage] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	
	function toHomePage() {
		navigate(`/`);
	}
	
	useEffect(() => {
		void (async () => {
			const p = await getPage("end");
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
				body: "Big message page cannot be found",
				image: "",
			}}
			onButtonClick={toHomePage}
		/>
	);
}