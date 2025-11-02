import { render, screen } from "@testing-library/react";
import { AdminGuardNotice } from "../AdminGuardNotice";
import { expect, it } from "vitest";

it("renders an alert", () => {
  render(<AdminGuardNotice />);
  expect(screen.getByRole("alert")).toBeInTheDocument();
});
