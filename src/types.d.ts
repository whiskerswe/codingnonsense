declare module '*.md?raw' {
	const content: string;
	export default content;
}

declare module '*.webp' {
	const src: string;
	export default src;
}

declare module '*.css';