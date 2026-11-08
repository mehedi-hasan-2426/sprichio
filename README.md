<p align="center"><img src="public/apple-touch-icon.png" width="96" alt="Sprichio logo" /></p>

<h1 align="center">Sprichio</h1>

<p align="center">German practice for everyday life. Try a sentence, then choose a topic.<br />
<a href="https://sprichio.de">sprichio.de</a></p>

![Sprichio's Cologne skyline background](public/og-image.jpg)

## What's inside

- A placement test, then 12 everyday topics such as daily routine, food and shopping,
  housing, health, work and travel. Each topic has vocabulary, grammar, reading,
    speaking, writing, a conversation and a review quiz.
- 35 grammar topics with explanations, examples and graded practice.
- Flashcards that come back after 1, 3, 7, 14 and 30 days.
- Writing tasks with a word counter. The model text appears after you submit.
- A der/die/das drill, and ä ö ü ß buttons for phones without a German keyboard.
- Checkpoints after topics 4, 8 and 12.

Listening is not finished yet. Instructions are in English; reading and writing
tasks are in German. The checkpoints are self-assessment, not a certificate.

## Guest or account

The public introduction contains an original sample exercise and does not load
learner progress or the course. Its sitemap lists only that page. The learning
dashboard at `/learn` and all course pages require an account or explicit guest
entry; they remain excluded from search indexing. `/signin` redirects to the
introduction instead of showing a second entry screen.

Anyone can try the course as a guest. Guest progress stays in that browser.
Signing in with Google saves progress to the cloud, but only two approved accounts
can sign in.

## Run it locally

Use Node.js 22.13 or newer in the 22.x line, or Node.js 24 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000 and choose **Start practising**. Google sign-in and cloud saves
need environment variables, described in [docs/maintaining.md](docs/maintaining.md).

## Checks

```sh
npm run lint
npm test
npm run build
```

The full list of checks, the content pipeline and the deployment notes are in
[docs/maintaining.md](docs/maintaining.md). Security details are in
[SECURITY.md](SECURITY.md) and [docs/threat-model.md](docs/threat-model.md).

## Built with

Next.js (Pages Router), React, NextAuth, Neon Postgres and plain CSS. Animations are
CSS only and switch to short fades when the device asks for reduced motion.

## Licence

Code: MIT ([LICENSE](LICENSE)). Course content: all rights reserved ([NOTICE](NOTICE)).
