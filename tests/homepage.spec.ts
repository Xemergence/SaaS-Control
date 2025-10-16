import { expect, test } from "@playwright/test";

test.describe("Homepage UI", () => {
  test("renders innovation timeline and supports theme toggling", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Journey to Product Launch" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Built for Innovation" }),
    ).toBeVisible();

    await expect(
      page.getByText("Brainstorm and validate your concept"),
    ).toBeVisible();
    await expect(page.getByText("Customizable Workflows")).toBeVisible();

    const themeToggle = page.getByRole("button", { name: /theme/i });
    await expect(themeToggle).toBeVisible();

    const initialDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    await themeToggle.click();
    await page.waitForTimeout(150);
    const toggledDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    expect(toggledDark).not.toBe(initialDark);
  });
});
