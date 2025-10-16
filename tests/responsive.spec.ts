import { test } from "@playwright/test";
import { mkdirSync } from "fs";
import path from "path";

type ViewportPreset = {
  label: string;
  width: number;
  height: number;
};

const routes = [
  { path: "/", name: "home" },
  { path: "/3d-products", name: "products" },
  { path: "/nfc-keychains", name: "nfc" },
] as const;

const viewports: ViewportPreset[] = [
  { label: "360", width: 360, height: 780 },
  { label: "390", width: 390, height: 844 },
  { label: "768", width: 768, height: 1024 },
  { label: "1024", width: 1024, height: 768 },
  { label: "1280", width: 1280, height: 900 },
  { label: "1440", width: 1440, height: 960 },
  { label: "1920", width: 1920, height: 1080 },
  { label: "2560", width: 2560, height: 1440 },
];

const orientations = [
  {
    label: "portrait",
    size: (vp: ViewportPreset) => ({ width: vp.width, height: vp.height }),
  },
  {
    label: "landscape",
    size: (vp: ViewportPreset) => ({ width: vp.height, height: vp.width }),
  },
] as const;

const themes = ["light", "dark"] as const;

const outputRoot = path.join(process.cwd(), "test-results", "responsive");

test.beforeAll(() => {
  mkdirSync(outputRoot, { recursive: true });
  for (const route of routes) {
    mkdirSync(path.join(outputRoot, route.name), { recursive: true });
  }
});

for (const route of routes) {
  for (const viewport of viewports) {
    for (const orientation of orientations) {
      for (const theme of themes) {
        const screenshotName = `${viewport.label}-${orientation.label}-${theme}.png`;
        const screenshotPath = path.join(
          outputRoot,
          route.name,
          screenshotName,
        );

        test(
          `${route.name} ${viewport.label} ${orientation.label} ${theme}`,
          async ({ page }) => {
            const size = orientation.size(viewport);

            await page.context().clearCookies();
            await page.addInitScript(
              ([storageKey, value]) => {
                window.localStorage.setItem(storageKey, value);
              },
              ["xe-theme", theme],
            );
            await page.setViewportSize(size);
            await page.goto(route.path, { waitUntil: "networkidle" });
            await page.waitForLoadState("networkidle");

            await page.waitForTimeout(250);
            await page.screenshot({
              path: screenshotPath,
              fullPage: true,
            });
          },
        );
      }
    }
  }
}
