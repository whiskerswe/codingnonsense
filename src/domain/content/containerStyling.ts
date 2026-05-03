
export const containerStyling = {
	verse: "verse pl-6",
	note: "note italic text-sm",
} as const;
export type ContainerName = keyof typeof containerStyling;