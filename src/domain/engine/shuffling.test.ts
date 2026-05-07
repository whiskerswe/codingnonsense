import { shuffleAndTake } from "./shuffling.ts";

it("returns array with length between min and max", () => {
	const result = shuffleAndTake([1,2,3,4,5], 2, 4);
	expect(result.length).toBeGreaterThanOrEqual(2);
	expect(result.length).toBeLessThanOrEqual(4);
});

it("only contains elements from input", () => {
	const input = [1,2,3,4];
	const result = shuffleAndTake(input);
	
	result.forEach(x => {
		expect(input).toContain(x);
	});
});

it("does not mutate input array", () => {
	const input = [1,2,3];
	const copy = [...input];
	
	shuffleAndTake(input);
	
	expect(input).toEqual(copy);
});

it("handles min = max", () => {
	const result = shuffleAndTake([1,2,3], 2, 2);
	expect(result.length).toBe(2);
});
