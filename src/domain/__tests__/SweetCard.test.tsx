import { render, screen } from "@testing-library/react";
import { SweetCard } from "../SweetCard";
import { expect, it } from "vitest";

const base = { id: 1, name: "Gulab Jamun", category: "Indian", price: 0.5, quantity: 5 };

it("shows name, category, price and quantity", () => {
  render(<SweetCard sweet={base} />);
  expect(screen.getByText(/Gulab Jamun/i)).toBeInTheDocument();
  expect(screen.getByText(/Indian/i)).toBeInTheDocument();
  expect(screen.getByText(/₹0\.50/i)).toBeInTheDocument();
  expect(screen.getByTestId("qty")).toHaveTextContent("5");
});

it("disables purchase button when quantity is 0", () => {
  render(<SweetCard sweet={{ ...base, quantity: 0 }} />);
  const btn = screen.getByRole("button", { name: /purchase|out of stock/i });
  expect(btn).toBeDisabled();
});
