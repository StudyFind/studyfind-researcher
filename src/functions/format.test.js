import format from "./format";

test("Check if time functions converts time correctly", () => {
  expect(format.time("15:35")).toBe("3:35pm");
});
