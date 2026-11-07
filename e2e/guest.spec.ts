import { expect, test, type Page } from "@playwright/test";

async function enterAsGuest(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Start practising", exact: true }).click();
  await page.waitForURL((url) => url.pathname === "/learn");
}

async function sectionLinks(page: Page, topic = 1) {
  await page.goto(`/woche/${topic}`);
  const hrefs = await page.locator(`a[href^="/woche/${topic}/"]`).evaluateAll((as) => as.map((a) => ({ href: a.getAttribute("href") ?? "", text: a.textContent ?? "" })));
  return [...new Map(hrefs.map((h) => [h.href, h])).values()];
}

async function noHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, page.url()).toBeLessThanOrEqual(1);
}

test("guest sign-in control stays visible and stable while hovering", async ({ page }, testInfo) => {
  await enterAsGuest(page);
  const link = page.locator(".top").getByRole("link", { name: "Sign in", exact: true });
  const mobile = testInfo.project.name === "mobile";
  for (const appearance of ["light", "dark"]) {
    await page.mouse.move(0, 0);
    await page.evaluate((value) => { document.documentElement.dataset.appearance = value; }, appearance);
    await expect(link).toBeVisible();
    await noHorizontalScroll(page);
    expect(await link.evaluate((element) => getComputedStyle(element).borderTopStyle)).toBe("solid");
    expect(await link.evaluate((element) => getComputedStyle(element).textDecorationLine)).toBe("none");
    const initial = await link.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        x: rect.x, y: rect.y, width: rect.width, height: rect.height,
        color: style.color, background: style.backgroundColor, border: style.borderTopColor,
        transform: style.transform, transition: style.transitionDuration, animation: style.animationName,
      };
    });
    expect(initial.transition).toBe("0s");
    expect(initial.animation).toBe("none");
    expect(initial.transform).toBe("none");
    expect(initial.height).toBeGreaterThanOrEqual(44);
    for (const offset of mobile ? [] : [initial.height / 2, 1, initial.height - 1]) {
      await page.mouse.move(initial.x + initial.width / 2, initial.y + offset);
      const hovered = await link.evaluate((element) => {
        const style = getComputedStyle(element);
        return { background: style.backgroundColor, border: style.borderTopColor };
      });
      expect(await link.evaluate((element) => getComputedStyle(element).textDecorationLine)).toBe("none");
      const frames = await link.evaluate((element) => new Promise<{ x: number; y: number; width: number; height: number; color: string; background: string; border: string; transform: string; hovered: boolean }[]>((resolve) => {
        const frames: { x: number; y: number; width: number; height: number; color: string; background: string; border: string; transform: string; hovered: boolean }[] = [];
        const sample = () => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          frames.push({
            x: rect.x, y: rect.y, width: rect.width, height: rect.height,
            color: style.color, background: style.backgroundColor, border: style.borderTopColor,
            transform: style.transform, hovered: element.matches(":hover"),
          });
          if (frames.length < 30) requestAnimationFrame(sample);
          else resolve(frames);
        };
        requestAnimationFrame(sample);
      }));
      for (const frame of frames) {
        expect(frame).toEqual({
          x: initial.x, y: initial.y, width: initial.width, height: initial.height,
          color: initial.color, background: hovered.background, border: hovered.border,
          transform: "none", hovered: true,
        });
      }
    }
    await link.focus();
    await expect(link).toBeFocused();
    expect(await link.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
    await page.locator(".account-actions").screenshot({ path: testInfo.outputPath(`guest-sign-in-${appearance}.png`) });
  }
  if (mobile) {
    for (const width of [320, 393]) {
      await page.setViewportSize({ width, height: 851 });
      await expect(link).toBeVisible();
      await noHorizontalScroll(page);
      await page.locator(".top").screenshot({ path: testInfo.outputPath(`guest-header-${width}.png`) });
    }
  }
  await link.click();
  await expect(page).toHaveURL((url) => url.pathname === "/");
  await expect(page.getByRole("button", { name: "Google sign-in", exact: true })).toBeVisible();
});

test("public intro is indexable, interactive and private-data free", async ({ page, request }, testInfo) => {
  const apiRequests: string[] = [];
  page.on("request", (sent) => { if (new URL(sent.url()).pathname.startsWith("/api/")) apiRequests.push(sent.url()); });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page).toHaveTitle("Sprichio | Deutsch lernen und online üben");
  await expect(page.locator(".logo-word").first()).toHaveText("Sprichio");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sprichio");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://sprichio.de/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  await expect(page.locator(".landing")).not.toContainText("A2");
  await expect(page.locator("canvas.particles, .signin-screen, .signin-content")).toHaveCount(0);
  const bootstrap = JSON.parse(await page.locator("#__NEXT_DATA__").textContent() ?? "{}") as { props: { pageProps: Record<string, unknown> } };
  expect(Object.keys(bootstrap.props.pageProps).sort()).toEqual(["configured", "denied"]);
  const privateRoute = await request.get("/learn", { maxRedirects: 0 });
  expect(privateRoute.status()).toBe(307);
  expect(privateRoute.headers().location).toBe("/");
  expect(privateRoute.headers()["x-robots-tag"]).toContain("noindex");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const locations = await page.evaluate((xml) => {
    const parsed = new DOMParser().parseFromString(xml, "application/xml");
    if (parsed.querySelector("parsererror")) throw new Error("Invalid sitemap XML");
    return Array.from(parsed.getElementsByTagName("loc"), (node) => node.textContent);
  }, sitemap);
  expect(locations).toEqual(["https://sprichio.de/"]);
  const hero = page.locator(".landing-hero");
  expect(await hero.evaluate((element) => getComputedStyle(element).backgroundImage)).toContain("landing-bg");
  await noHorizontalScroll(page);
  await page.screenshot({ path: testInfo.outputPath("intro-light.png"), fullPage: true });
  await page.getByRole("switch", { name: "Dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-appearance", "dark");
  await page.screenshot({ path: testInfo.outputPath("intro-dark.png"), fullPage: true });
  await page.getByRole("button", { name: "bei", exact: true }).click();
  await expect(page.locator(".landing-answer")).toContainText("Not quite");
  await page.getByRole("button", { name: "mit", exact: true }).click();
  await expect(page.locator(".landing-answer")).toContainText("Richtig");
  await expect(page.locator(".landing-gap")).toHaveText("mit");
  expect(apiRequests).toEqual([]);
  if (testInfo.project.name === "mobile") {
    await page.setViewportSize({ width: 320, height: 740 });
    await noHorizontalScroll(page);
    await page.screenshot({ path: testInfo.outputPath("intro-320.png"), fullPage: true });
  } else {
    await page.setViewportSize({ width: 820, height: 900 });
    await noHorizontalScroll(page);
    await page.screenshot({ path: testInfo.outputPath("intro-tablet.png"), fullPage: true });
  }
});

test("guest entry failures keep the intro usable", async ({ page }) => {
  await page.route("**/api/guest", (route) => route.fulfill({ status: 503, body: "Unavailable" }));
  await page.goto("/");
  await page.getByRole("button", { name: "Start practising", exact: true }).click();
  await expect(page.locator(".landing").getByRole("alert")).toContainText("your saved progress has not changed");
  await expect(page.getByRole("button", { name: "Start practising", exact: true })).toBeEnabled();
  await expect(page).toHaveURL((url) => url.pathname === "/");
});

test("guest practice survives returning to the public intro", async ({ page }) => {
  await enterAsGuest(page);
  await page.goto("/woche/2/gespraech");
  await page.getByRole("button", { name: "Show all" }).click();
  const item = page.locator("fieldset.item").first();
  await item.getByRole("button").first().click();
  await expect(item.locator(".feedback")).toBeVisible();
  const feedback = await item.locator(".feedback").textContent();
  await page.goto("/");
  await page.getByRole("button", { name: "Start practising", exact: true }).click();
  await page.waitForURL((url) => url.pathname === "/learn");
  await page.goto("/woche/2/gespraech");
  await page.getByRole("button", { name: "Show all" }).click();
  await expect(page.locator("fieldset.item").first().locator(".feedback")).toHaveText(feedback ?? "");
});

test("Sprichio icons have transparent corners and visible pixels", async ({ page }) => {
  await page.goto("/");
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
  await page.screenshot({ path: test.info().outputPath("sprichio-intro.png"), fullPage: true });
});

test("public intro stays still with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(await page.locator(".landing-hero").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await noHorizontalScroll(page);
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

test("two-way prepositions switch between wo and wohin in the scene", async ({ page }) => {
  await enterAsGuest(page);
  await page.goto("/grammatik/prepositions/two-way");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Two-way prepositions: wo or wohin");
  const line = page.locator(".scene-line");
  await expect(line).toContainText("Der Ball liegt auf dem Tisch.");
  await page.getByRole("button", { name: /^Wohin\?/ }).click();
  await expect(line).toContainText("Ich lege den Ball auf den Tisch.");
  await page.getByRole("group", { name: "Preposition" }).getByRole("button", { name: "unter", exact: true }).click();
  await expect(line).toContainText("Der Ball rollt unter den Tisch.");
  await expect(page.getByRole("heading", { name: "Common mistakes" })).toBeVisible();
  await noHorizontalScroll(page);
  await page.getByRole("link", { name: "Skip to the 15 exercises" }).click();
  await expect(page.getByRole("heading", { name: "Practice", exact: true })).toBeInViewport();
});

test("Practise more keeps Grammar selected inside lessons", async ({ page }, testInfo) => {
  await enterAsGuest(page);
  const grammar = (await sectionLinks(page, 6)).find((link) => /grammar|grammatik/i.test(link.text + link.href));
  expect(grammar).toBeTruthy();
  const topicRoute = grammar?.href ?? "/woche/6";
  await page.goto(topicRoute);
  const links = await page.locator(".more-grammar a").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href") ?? ""));
  expect(links.length).toBeGreaterThan(0);
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const grammarTab = navigation.getByRole("link", { name: "Grammar", exact: true });
  for (const width of testInfo.project.name === "mobile" ? [393] : [820, 1280]) {
    await page.setViewportSize({ width, height: 851 });
    for (const [index, href] of links.entries()) {
      await page.goto(topicRoute);
      await page.locator(".more-grammar a").nth(index).click();
      await expect(page).toHaveURL((url) => url.pathname === href);
      await expect(grammarTab).toHaveAttribute("aria-current", "page");
      await expect(navigation.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(page.getByRole("heading", { name: "The rule in short", exact: true })).toHaveCount(0);
      await expect(page.locator(".grammar-rule")).toHaveCount(0);
      await expect(page.getByRole("heading", { name: "How it works", exact: true })).toBeVisible();
      await noHorizontalScroll(page);
    }
    await page.reload();
    await expect(grammarTab).toHaveAttribute("aria-current", "page");
    await navigation.screenshot({ path: testInfo.outputPath(`grammar-selected-${width}.png`) });
  }
  await page.goto("/material/grammatik");
  await expect(grammarTab).toHaveAttribute("aria-current", "page");
  await page.goto("/learn");
  await expect(grammarTab).not.toHaveAttribute("aria-current", "page");
  await expect(navigation.getByRole("link", { name: "Today", exact: true })).toHaveAttribute("aria-current", "page");
});

test("grammar tables keep words readable on narrow screens", async ({ page }, testInfo) => {
  testInfo.setTimeout(120_000);
  await enterAsGuest(page);
  const routes = ["/material/grammatik"];
  await page.goto(routes[0] ?? "/material/grammatik");
  const lessons = await page.locator('a[href^="/grammatik/"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href") ?? ""))]);
  expect(lessons.length).toBeGreaterThan(0);
  routes.push(...lessons);
  for (let topic = 1; topic <= 12; topic += 1) {
    const grammar = (await sectionLinks(page, topic)).find((link) => /grammar|grammatik/i.test(link.text + link.href));
    expect(grammar, `topic ${topic} grammar section`).toBeTruthy();
    routes.push(grammar?.href ?? `/woche/${topic}`);
  }
  let foundVowelChange = false;
  if (testInfo.project.name === "mobile") {
    await page.setViewportSize({ width: 295, height: 851 });
    await page.goto("/grammatik/prepositions/dative");
    await noHorizontalScroll(page);
    await page.getByRole("figure", { name: "Always dative", exact: true }).screenshot({ path: testInfo.outputPath("dative-prepositions-295.png") });
  }
  for (const width of testInfo.project.name === "mobile" ? [320, 393] : [1280]) {
    await page.setViewportSize({ width, height: 851 });
    for (const route of routes) {
      await page.goto(route);
      await noHorizontalScroll(page);
      if (route.startsWith("/grammatik/")) {
        await expect(page.getByRole("heading", { name: "The rule in short", exact: true })).toHaveCount(0);
        await expect(page.locator(".grammar-rule")).toHaveCount(0);
      }
      const broken = await page.locator("table:not(.vocab-table)").evaluateAll((tables) => {
        const broken: string[] = [];
        for (const table of tables) {
          const walker = document.createTreeWalker(table, NodeFilter.SHOW_TEXT);
          let node = walker.nextNode();
          while (node) {
            for (const word of (node.textContent ?? "").matchAll(/[\p{L}\p{M}]{2,}/gu)) {
              const range = document.createRange();
              range.setStart(node, word.index);
              range.setEnd(node, word.index + word[0].length);
              const lines = new Set(Array.from(range.getClientRects(), (rect) => Math.round(rect.top)));
              if (lines.size > 1) broken.push(word[0]);
            }
            node = walker.nextNode();
          }
        }
        return broken;
      });
      const heading = page.getByRole("heading", { name: /Present tense with a vowel change/i }).first();
      if (await heading.count()) {
        foundVowelChange = true;
        const table = heading.locator("xpath=following-sibling::div[contains(@class, 'table-wrap')][1]");
        await table.evaluate((element) => { element.scrollLeft = 0; });
        await table.screenshot({ path: testInfo.outputPath(`vowel-change-${width}.png`) });
      }
      expect(broken, `${route} at ${width}px`).toEqual([]);
      const tables = page.locator(".table-wrap, .gv-scroll").filter({ has: page.locator("table:not(.vocab-table)") });
      for (const table of await tables.all()) {
        const reachable = await table.evaluate((wrapper) => {
          wrapper.scrollLeft = wrapper.scrollWidth;
          const last = wrapper.querySelector("tr:last-child td:last-child");
          const rect = wrapper.getBoundingClientRect();
          const cell = last?.getBoundingClientRect();
          return !cell || (cell.left >= rect.left - 1 && cell.right <= rect.right + 1);
        });
        expect(reachable, `${route} last column at ${width}px`).toBe(true);
      }
    }
  }
  expect(foundVowelChange, "reported vowel-change table was checked").toBe(true);
});

test("every grammar lesson fits the screen without sideways scrolling", async ({ page }) => {
  await enterAsGuest(page);
  for (const slug of ["cases/nominative-accusative-dative", "prepositions/places", "prepositions/time", "verbs/separable", "adjectives/endings", "conjunctions/subordinate"]) {
    await page.goto(`/grammatik/${slug}`);
    await expect(page.getByRole("heading", { name: "How it works" })).toBeVisible();
    await noHorizontalScroll(page);
  }
});

test("topic conversation reveals lines, translates them and fits the screen", async ({ page }) => {
  await page.addInitScript(() => {
    const calls: string[] = [];
    Object.defineProperty(window, "conversationSpeechCalls", { value: calls });
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        getVoices: () => [{ lang: "de-DE", name: "Anna" }, { lang: "de-DE", name: "Conrad" }],
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        cancel: () => undefined,
        speak: () => calls.push("speak"),
      },
    });
  });
  await enterAsGuest(page);
  await page.goto("/woche/2/gespraech");
  await expect(page.getByRole("heading", { name: "Im Café" })).toBeVisible();
  await expect(page.getByRole("img", { name: /At the café/ })).toBeVisible();
  const audioButtons = page.locator(".talk-view").getByRole("button", { name: /^(Sound|Listen first)$|^Listen:/ });
  await expect(audioButtons).toHaveCount(0);
  await page.getByRole("button", { name: "Play conversation", exact: true }).click();
  await expect(page.locator(".bubble")).toHaveCount(1);
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await page.getByRole("button", { name: "Next line" }).click();
  await expect(page.locator(".bubble").first()).toContainText("Was möchten Sie bestellen?");
  await page.getByRole("button", { name: "English" }).click();
  await expect(page.locator(".bubble-en").first()).toHaveText("Hello! What would you like to order?");
  await noHorizontalScroll(page);
  await page.screenshot({ path: test.info().outputPath("conversation-no-audio.png"), fullPage: true });
  await page.getByRole("button", { name: "Show all" }).click();
  await expect(page.locator(".bubble")).toHaveCount(11);
  await expect(page.getByText("Line 11 of 11")).toBeVisible();
  await expect(audioButtons).toHaveCount(0);
  await expect(page.getByText(/Audio needs a German voice|Text hidden\. Listen/)).toHaveCount(0);
  await page.getByRole("button", { name: "richtig" }).first().click();
  await noHorizontalScroll(page);
  await page.getByRole("button", { name: "Play again", exact: true }).click();
  await expect(page.locator(".bubble")).toHaveCount(1);
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  expect(await page.evaluate(() => Reflect.get(window, "conversationSpeechCalls"))).toEqual([]);
});
