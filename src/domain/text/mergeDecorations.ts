export function mergeDecorations(
	key: string,
	text_decoration: Partial<Record<string, string[]>>
): string[] {
	const global = text_decoration.all ?? [];
	const local = text_decoration[key] ?? [];
	
	return [...global, ...local];
}