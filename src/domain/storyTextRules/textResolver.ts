
export function resolveChapterText( body: string, parameters: string[] = [] ) {
	return interpolateBody(body, parameters)
}

function interpolateBody( body: string, parameters: string[] = [] ): string {
	return body.replace(/\{parameters\[(\d+)\]\}/g, ( _, index ) => {
		return parameters[Number(index)] ?? "";
	});
}
