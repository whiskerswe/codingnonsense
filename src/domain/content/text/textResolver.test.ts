import { describe, expect, it } from "vitest";
import { resolveTextWithParams } from "./textResolver.ts";

describe("resolveTextWithParams", () => {
	it("replaces numbered parameter placeholders", () => {
		const result = resolveTextWithParams(
			"Perhaps {parameters[0]}, or {parameters[1]}, or even {parameters[2]}.",
			["a thing", "another thing", "the other thing"]
		);

		expect(result).toBe("Perhaps a thing, or another thing, or even the other thing.");
	});

	it("replaces repeated placeholders with the same parameter", () => {
		const result = resolveTextWithParams(
			"{parameters[0]} saw {parameters[1]}. {parameters[0]} waved.",
			["Alice", "the rabbit"]
		);

		expect(result).toBe("Alice saw the rabbit. Alice waved.");
	});

	it("replaces missing parameters with an empty string", () => {
		const result = resolveTextWithParams("Hello {parameters[0]}{parameters[1]}.", ["world"]);

		expect(result).toBe("Hello world.");
	});

	it("uses an empty parameter list by default", () => {
		const result = resolveTextWithParams("Hello {parameters[0]}.");

		expect(result).toBe("Hello .");
	});

	it("leaves text without placeholders unchanged", () => {
		const result = resolveTextWithParams("Nothing to resolve.", ["ignored"]);

		expect(result).toBe("Nothing to resolve.");
	});

	it("leaves incomplete placeholders unchanged", () => {
		const result = resolveTextWithParams("Broken {parameters[0] placeholder", ["value"]);

		expect(result).toBe("Broken {parameters[0] placeholder");
	});

	it("leaves non-numeric parameter placeholders unchanged", () => {
		const result = resolveTextWithParams("Hello {parameters[first]}.", ["world"]);

		expect(result).toBe("Hello {parameters[first]}.");
	});
});
