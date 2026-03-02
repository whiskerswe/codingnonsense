import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage.tsx";
import { Header } from "./components/Header.tsx";
import { useState } from "react";
import { HomeContext } from "./app/HomeContext.tsx";
import { StoryPage } from "./pages/StoryPage.tsx";
import { StartPage } from "./pages/StartPage.tsx";

function App() {
	const [mode, setMode] = useState<"start" | "story">("start");
	
	function resetHome() {
		setMode("start");
	}
	
	return (
		<HomeContext.Provider value={{ resetHome }}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={
						mode === "start"
							? <StartPage onStart={() => setMode("story")} />
							: <StoryPage onExit={() => setMode("start")} />
					} />
					<Route path="/about" element={<AboutPage />} />
				</Routes>
			</BrowserRouter>
		</HomeContext.Provider>
	);
}

export default App;