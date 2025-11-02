import { render, screen } from "@testing-library/react";
import { Button } from "../components/Button";   // confirm path is correct
import { describe, expect, it } from "vitest";

describe("Button", () => {
  it("renders label", () => {
    render(<Button>Primary</Button>);
    expect(screen.getByText("Primary")).toBeInTheDocument();
  });

  // 🔽 Option 2 replacement
  it("applies variant=warning with dark text", () => {
    render(<Button variant="warning">Warn</Button>);
    const btn = screen.getByText("Warn");
    // check for use of the warning token variable and correct text color
    expect(btn.style.background).toContain("var(--sweet-warning)");
    expect(btn).toHaveStyle({ color: "black" });
  });
});
