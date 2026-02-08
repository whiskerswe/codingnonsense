export function getBuildTime(): string {
	const raw = import.meta.env.VITE_BUILD_TIME;
	return raw ? new Date(raw).toLocaleString() : "2026";
}