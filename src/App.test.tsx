import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { resolveImage } from "./domain/images/imageRegistry";

it("goes from start page to first chapter", async () => {
	render(<App />);
	
	const user = userEvent.setup();
	const startImageSrc = await resolveImage("alice_circle");
	const firstChapterImageSrc = await resolveImage("book3");
	
	await screen.findByRole("heading", { name: /A story.../i });
	const startImage = await screen.findByAltText(
		/illustration from alice in wonderland/i
	);
	expect(startImage).toHaveAttribute("src", startImageSrc);
	
	const openButton = await screen.findByRole("button", { name: /open/i });
	
	await user.click(openButton);
	
	await waitFor(() => {
		expect(
			screen.getByAltText(/illustration from alice in wonderland/i)
		).toHaveAttribute("src", firstChapterImageSrc);
	});
});
