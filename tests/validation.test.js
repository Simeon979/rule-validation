const { eq, neq, gt, gte, contains } = require("../lib/ruleValidator");

describe("Rule Validation", () => {
  test("gte", () => {
    expect(gte(30, 45)).toBe(true);
    expect(gte(-1, 0)).toBe(true);
    expect(gte(-2, -1)).toBe(true);
    expect(gte("a", "b")).toBe(true);

    expect(gte(45, 45)).toBe(true);
    expect(gte(0, 0)).toBe(true);
    expect(gte(-33, -33)).toBe(true);
    expect(gte("a", "a")).toBe(true);

    expect(gte(54, 45)).toBe(false);
    expect(gte(-1, -2)).toBe(false);
  });

  test("gt", () => {
    expect(gt(30, 45)).toBe(true);
    expect(gt(45, 45)).toBe(false);
    expect(gt(54, 45)).toBe(false);
    expect(gt(-20, 0)).toBe(true);
  });

  test("eq", () => {
    expect(eq(45, 45)).toBe(true);
    expect(eq("hello", "hello")).toBe(true);
    expect(eq("", "")).toBe(true);

    expect(eq(30, 45)).toBe(false);
    expect(eq("30", 30)).toBe(false);
    expect(eq(54, 45)).toBe(false);
  });

  test("neq", () => {
    expect(neq(30, 45)).toBe(true);
    expect(neq("hello", "hi")).toBe(true);
    expect(neq(45, 45)).toBe(false);
    expect(neq("hi", "hi")).toBe(false);
  });

  test("contains", () => {
    expect(contains(1, [1, 2])).toBe(true);
    expect(contains(0, [1, 2])).toBe(false);
    expect(
      contains("The Nauvoo", [
        "The Nauvoo",
        "The Razorback",
        "The Roci",
        "Tycho"
      ])
    ).toBe(true);
    expect(
      contains("rocinate", ["The Nauvoo", "The Razorback", "The Roci", "Tycho"])
    ).toBe(false);
    expect(contains("h", "hello")).toBe(true);
    expect(contains("o", "hi")).toBe(false);
  });
});
