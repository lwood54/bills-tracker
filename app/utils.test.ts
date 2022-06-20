import { validateEmail } from "./utils";

test("validateEmail returns false for non-emails", () => {
  expect(validateEmail("")).toStrictEqual({ emailError: "Email is invalid" });
  expect(validateEmail("not-an-email")).toStrictEqual({
    emailError: "Email is invalid",
  });
  expect(validateEmail("n@")).toStrictEqual({ emailError: "Email is invalid" });
});

test("validateEmail returns true for emails", () => {
  expect(validateEmail("kody@example.com")).toStrictEqual({ emailError: "" });
});
