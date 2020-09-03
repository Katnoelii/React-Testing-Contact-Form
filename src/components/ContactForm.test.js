import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("renders ContactForm without crashing", () => {
	render(<ContactForm />);
});

test("Can type into form and click submit - user returns upon submit button", async () => {
	// renders
	render(<ContactForm />);

	//inputs
	const inputFirstName = screen.getByLabelText(/first name/i);
	const inputLastName = screen.getByLabelText(/last name/i);
	const inputEmail = screen.getByLabelText(/email/i);
	const inputMessage = screen.getByLabelText(/message/i);

	//typing inputs
	fireEvent.change(inputFirstName, { target: { value: "Kate" } });
	fireEvent.change(inputLastName, { target: { value: "Roy" } });
	fireEvent.change(inputEmail, { target: { value: "kate-roy@lambdastudents.com" } });
	fireEvent.change(inputMessage, { target: { value: "Insert something witty here" } });

	const submitBtn = screen.getByRole("button", { name: /submit/i });

	fireEvent.click(submitBtn);

	// assertion
	expect(await screen.findByText(/Roy/i)).toBeInTheDocument();

	const errors = screen.queryAllByText(/Looks like there was an error:/i);


	screen.debug();
});
