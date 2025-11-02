import { MockApi } from "../api.mock";
import { expect, it } from "vitest";

it("purchases and decrements quantity", async () => {
  const before = await MockApi.listSweets();
  const target = before[0];
  const after = await MockApi.purchase(target.id, 2);
  expect(after.quantity).toBe(target.quantity - 2);
});
