import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

it("goes from start page to first chapter", async () => {
	render(<App />);
	
	expect(
		screen.getByRole("heading", { name: /start/i })
	).toBeInTheDocument();
	
	const user = userEvent.setup();
	const openButton = screen.getByRole("button", { name: /open/i });
	
	await user.click(openButton);
	
	await screen.findByRole("heading");
	
	const image = screen.getByAltText(
		/illustration from alice in wonderland/i
	);
	
	expect(image).toBeInTheDocument();
});