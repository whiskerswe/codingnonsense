import type { JSX } from "react";
import type { StyledText } from "../domain/models/styledText.ts";

export function Sentence( {text, decoration}: StyledText ): JSX.Element {
	const classes = [];
	if (decoration?.includes("italics")) classes.push("italic");
	const isNewLine = decoration?.includes("new_line");
	return <>
		{isNewLine && <br/>}
			<span className={classes.join(" ")}>{text + " "}</span>
		{isNewLine && <br/>}
	</>;
}