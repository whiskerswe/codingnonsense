import type { StyledText } from "../types/chapter.ts";
import type { JSX } from "react";

export function Sentence( {text, decoration}: StyledText ): JSX.Element {
	const classes = [];
	if (decoration?.includes("italics")) classes.push("italic");
	const isNewLine = decoration?.includes("new_line");
	return <>
		{isNewLine && <br/>}
			<span className={classes.join(" ")}>{text}</span>
		{isNewLine && <br/>}
	</>;
}