import { fireEvent, render, screen } from "@testing-library/react";
import { InventoryPanel } from "../InventoryPanel";
import { expect, it, vi } from "vitest";

it("calls onPurchase", () => {
  const onPurchase = vi.fn();
  render(<InventoryPanel sweetId={1} onPurchase={onPurchase} />);
  fireEvent.click(screen.getByRole("button", { name: /purchase 1/i }));
  expect(onPurchase).toHaveBeenCalledWith(1);
});

it("calls onRestock when provided", () => {
  const onRestock = vi.fn();
  render(<InventoryPanel sweetId={2} onPurchase={() => {}} onRestock={onRestock} />);
  const input = screen.getByLabelText("restock-qty");
  fireEvent.change(input, { target: { value: "3" } });
  fireEvent.click(screen.getByRole("button", { name: /restock/i }));
  expect(onRestock).toHaveBeenCalledWith(2, 3);
});
