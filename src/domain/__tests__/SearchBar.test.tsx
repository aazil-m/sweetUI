import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../SearchBar";
import { expect, it, vi } from "vitest";

it("emits changes for all fields", () => {
  const value = { name: "", category: "", minPrice: "" as const, maxPrice: "" as const };
  const onChange = vi.fn();
  render(<SearchBar value={value} onChange={onChange} />);

  fireEvent.change(screen.getByLabelText("name"), { target: { value: "gulab" } });
  fireEvent.change(screen.getByLabelText("category"), { target: { value: "indian" } });
  fireEvent.change(screen.getByLabelText("minPrice"), { target: { value: 10 } });
  fireEvent.change(screen.getByLabelText("maxPrice"), { target: { value: 50 } });

  expect(onChange).toHaveBeenCalledTimes(4);
});
