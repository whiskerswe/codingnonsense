
export const containerStyling = {
	verse: "verse pl-8",
	note: "note italic text-sm",
	details: "details-section",
	message: "font-serif py-8 text-6xl text-center \"w-full max-w-3/4"
} as const;
export type ContainerName = keyof typeof containerStyling;

/*
<div class="flex flex-col items-center py-8"> <!-- Parent: Centers everything -->
<div class="inline-block text-left">        <!-- Wrapper: Aligns stanzas to each other -->
<p>Stanza 1...</p>
<p>Stanza 2...</p>
<p>Stanza 3...</p>
</div>
</div>

**/