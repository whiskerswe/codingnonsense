import { StoryPage } from "./StoryPage.tsx";
import { StartPage } from "./StartPage.tsx";
import { useState } from "react";
import { HomeContext } from "../app/HomeContext.tsx";

export function Home() {
	const [mode, setMode] = useState<"start" | "story">("start");
	
	function resetHome() {
		setMode("start");
	}
	
	return (
		<HomeContext.Provider value={{ resetHome }}>
			{mode === "start"
				? <StartPage onStart={() => setMode("story")} />
				: <StoryPage onExit={() => setMode("start")} />
			}
		</HomeContext.Provider>
	);
}