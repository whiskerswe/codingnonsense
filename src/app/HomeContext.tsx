import { createContext, useContext } from "react";

export const HomeContext = createContext<{
	resetHome: () => void;
} | null>(null);

export function useHome() {
	const ctx = useContext(HomeContext);
	if (!ctx) throw new Error("useHome must be used within HomeProvider");
	return ctx;
}