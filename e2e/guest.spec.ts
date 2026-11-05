import { expect, test, type Page } from "@playwright/test";

async function enterAsGuest(page: Page) {
  await page.goto("/signin");
  await page.getByRole("button", { name: "Continue as guest" }).click();
  await page.waitForURL((url) => url.pathname === "/");
}

async function sectionLinks(page: Page) {
  await page.goto("/woche/1");
  const hrefs = await page.locator('a[href^="/woche/1/"]').evaluateAll((as) => as.map((a) => ({ href: a.getAttribute("href") ?? "", text: a.textContent ?? "" })));
  return [...new Map(hrefs.map((h) => [h.href, h])).values()];
}

async function noHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

test("sign-in page renders particles and fits the screen", async ({ page }) => {
  await page.goto("/signin");
  await expect(page).toHaveTitle("Sign in · Sprichio");
  await expect(page.locator(".logo-word")).toHaveText("Sprichio");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Deutsch lernen.");
  await expect(page.locator("canvas.particles")).toBeAttached();
  await noHorizontalScroll(page);
});

test("Sprichio icons have transparent corners and visible pixels", async ({ page }) => {
  await page.goto("/signin");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/favicon.svg");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Sprichio");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://sprichio.de/og-image.jpg");
  const icons = await page.evaluate(async () => {
    const results = [];
    for (const path of ["/favicon.svg", "/apple-touch-icon.png"]) {
      const image = new Image();
      image.src = path;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      context.drawImage(image, 0, 0, 64, 64);
      const pixels = context.getImageData(0, 0, 64, 64).data;
      results.push({ path, cornerAlpha: pixels[3], visible: pixels.some((value, index) => index % 4 === 3 && value > 0) });
    }
    return results;
  });
  for (const icon of icons) {
    expect(icon.cornerAlpha, icon.path).toBe(0);
    expect(icon.visible, icon.path).toBe(true);
  }
  await noHorizontalScroll(page);
  await page.screenshot({ path: test.info().outputPath("sprichio-signin.png"), fullPage: true });
});

test("particles stay off with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/signin");
  const drawn = await page.locator("canvas.particles").evaluate((c: HTMLCanvasElement) => c.width > 300 && c.height > 150);
  expect(drawn).toBe(false);
});

test("guest can open week 1 and gap fields keep their width while typing", async ({ page }) => {
  await enterAsGuest(page);
  await expect(page.getByRole("link", { name: "Sprichio home" })).toBeVisible();
  await noHorizontalScroll(page);
  const links = await sectionLinks(page);
  await noHorizontalScroll(page);
  expect(links.length).toBeGreaterThan(3);
  let gap = page.locator("input.blank").first();
  for (const link of links) {
    await page.goto(link.href);
    if ((await gap.count()) > 0) break;
  }
  gap = page.locator("input.blank").first();
  await expect(gap).toBeVisible();
  const before = await gap.evaluate((el) => el.getBoundingClientRect().width);
  await gap.fill("Zusammenarbeit");
  const after = await gap.evaluate((el) => el.getBoundingClientRect().width);
  expect(after).toBe(before);
});

test("rubric scores move with arrow keys", async ({ page }) => {
  await enterAsGuest(page);
  const speaking = (await sectionLinks(page)).find((l) => /speak|sprechen/i.test(l.text + l.href));
  expect(speaking).toBeTruthy();
  await page.goto(speaking?.href ?? "/woche/1");
  const group = page.locator(".rubric").getByRole("radiogroup").first();
  await expect(group).toBeVisible();
  await group.getByRole("radio").first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(group.getByRole("radio", { checked: true })).toHaveText("1");
  await expect(group.getByRole("radio", { name: "1" })).toBeFocused();
  await page.keyboard.press("End");
  await expect(group.getByRole("radio", { checked: true })).not.toHaveText("1");
});

test("checkpoint shows telc-style reading, writing and speaking and scores a reading answer", async ({ page }) => {
  await enterAsGuest(page);
  for (const checkpoint of [1, 2, 3]) {
    await page.goto(`/checkpoint/${checkpoint}`);
    await expect(page.getByText("telc-aligned practice, not a full mock exam.")).toHaveCount(0);
    await expect(page.getByText("Official format and free practice test:", { exact: false })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "What now?", exact: true })).toHaveCount(0);
    await expect(page.getByText("Not all areas are done yet.", { exact: true })).toHaveCount(0);
    for (const name of ["Lesen (reading)", "Schreiben (writing)", "Sprechen (speaking)"]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    await expect(page.locator(".ads li")).toHaveCount(8);
    await noHorizontalScroll(page);
  }
  await page.goto("/checkpoint/1");
  const first = page.locator("fieldset.item").first();
  await first.getByRole("button", { name: /den Vermieter/ }).click();
  await expect(first.getByText("Correct!")).toBeVisible();
});

test("writing shows one task at a time", async ({ page }) => {
  await enterAsGuest(page);
  const writing = (await sectionLinks(page)).find((l) => /writ|schreib/i.test(l.text + l.href));
  expect(writing).toBeTruthy();
  await page.goto(writing?.href ?? "/woche/1");
  await expect(page.locator(".writing")).toHaveCount(1);
  const first = await page.locator(".writing .task").textContent();
  await page.getByRole("button", { name: "Next task" }).click();
  await expect(page.locator(".writing .task")).not.toHaveText(first ?? "");
  await expect(page.getByText(/^Task 2 of \d+$/)).toBeVisible();
});

test("flashcards page loads for guests", async ({ page }) => {
  await enterAsGuest(page);
  await page.goto("/karten");
  await expect(page.locator("main")).toBeVisible();
  await noHorizontalScroll(page);
});
