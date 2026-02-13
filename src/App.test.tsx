import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App UI", () => {
	it("changes chapter text and image when clicking", async () => {
		render(<App />);
		
		const srcBefore = screen.getByRole("img").getAttribute("src");
		
		const button = screen.getByRole("button");
		await userEvent.click(button);
		
		// expect(imageAfter).not.toBe(imageBefore);
		await waitFor(() => {
			const srcAfter = screen.getByRole("img").getAttribute("src");
			expect(srcAfter).not.toBe(srcBefore);
		});
	});
});


