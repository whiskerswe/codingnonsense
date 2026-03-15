import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage.tsx";
import { Header } from "./components/Header.tsx";
import { HomeContext } from "./app/HomeContext.tsx";
import { StoryPage } from "./pages/StoryPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";

function App() {
	
	function resetHome() {
	}
	
	return (
		<HomeContext.Provider value={{ resetHome }}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/chapter/:chapterId" element={<StoryPage />} />
					<Route path="/about" element={<AboutPage />} />
				</Routes>
			</BrowserRouter>
		</HomeContext.Provider>
	);
}

export default App;