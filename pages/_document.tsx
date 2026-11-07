import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="referrer" content="no-referrer" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f5f6f8" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0d0f11" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=sprichio" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sprichio" />
        <meta property="og:image" content="https://sprichio.de/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <Script src="/appearance.js" strategy="beforeInteractive" defer={false} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
