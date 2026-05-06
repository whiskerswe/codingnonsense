export function shuffleAndTake<T>(
	arr: T[],
	min = 2,
	max = arr.length
): T[] {
	const shuffled = [...arr]
	
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	
	const count =
		Math.floor(Math.random() * (max - min + 1)) + min
	
	return shuffled.slice(0, count)
}