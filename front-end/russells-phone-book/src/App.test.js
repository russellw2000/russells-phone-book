import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Renders Russells Phone Book title", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Russells Phone Book/i);
  expect(linkElement).toBeInTheDocument();
});
