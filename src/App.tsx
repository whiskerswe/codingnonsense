import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header.tsx";
import { HomeContext } from "./app/HomeContext.tsx";
import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage.tsx";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const StoryPage = lazy(() => import("./pages/StoryPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
	
	function resetHome() {
	}
	
	return (
		<HomeContext.Provider value={{ resetHome }}>
			<BrowserRouter>
				<Header />
				<Suspense fallback={<div></div>}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/chapter/:chapterId"
							element={<StoryPage key={window.location.pathname} />}
						/>
						<Route path="/about" element={<AboutPage />} />
						<Route path="/not-found" element={<NotFoundPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</HomeContext.Provider>
	);
}

export default App;