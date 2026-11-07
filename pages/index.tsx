import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { authConfigured } from "../src/server/auth.ts";
import { Logo } from "../src/components/Logo.tsx";
import { ThemeToggle } from "../src/components/ThemeToggle.tsx";

interface Props {
  configured: boolean;
  denied: boolean;
}

export default function Introduction({ configured, denied }: Props) {
  const [pending, setPending] = useState<"guest" | "google" | null>(null);
  const [failed, setFailed] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const correct = answer === "mit";

  const enter = async (mode: "guest" | "google") => {
    if (pending) return;
    setPending(mode);
    setFailed(false);
    try {
      if (mode === "google") {
        await signIn("google", { callbackUrl: "/learn" });
        return;
      }
      const response = await fetch("/api/guest", { method: "POST", headers: { "x-sprungbrett-guest": "1" } });
      if (!response.ok) throw new Error("Guest access unavailable");
      window.location.assign("/learn");
    } catch {
      setFailed(true);
      setPending(null);
    }
  };

  return (
    <div className="landing" id="top">
      <Head>
        <title>Sprichio | Deutsch lernen und online üben</title>
        <meta name="description" key="description" content="Deutsch üben mit Sprichio: Grammatik, Wortschatz und Gespräche aus dem Alltag. Probiere eine Übung aus und lerne ohne Konto als Gast." />
        <link rel="canonical" href="https://sprichio.de/" />
        <meta name="robots" content={denied ? "noindex, follow" : "index, follow"} />
        <meta property="og:title" key="og-title" content="Sprichio | Deutsch für deinen Alltag" />
        <meta property="og:description" key="og-description" content="Grammatik, Wörter und Alltagssituationen. Dein nächster deutscher Satz beginnt hier." />
        <meta property="og:url" content="https://sprichio.de/" />
      </Head>
      <a className="skip" href="#main">Skip to content</a>
      <header className="landing-nav">
        <Link href="/" className="brand" aria-label="Sprichio home"><Logo /></Link>
        <nav aria-label="Introduction"><a href="#try-it">Try a sentence</a><a href="#privacy">Your privacy</a><ThemeToggle /></nav>
      </header>
      <main id="main" className="landing-main">
        <section className="landing-hero" aria-labelledby="intro-title">
          <div className="landing-hero-content">
            <h1 id="intro-title">Sprichio</h1>
            <p className="landing-offer" lang="de">Deutsch für deinen Alltag</p>
            <p className="landing-lede">Find the words for your next conversation.</p>
            <div className="landing-actions">
              <button type="button" disabled={pending !== null} onClick={() => { void enter("guest"); }}>{pending === "guest" ? "Opening practice…" : "Start practising"}</button>
              <button type="button" className="secondary" disabled={!configured || pending !== null} onClick={() => { void enter("google"); }}>{pending === "google" ? "Opening Google…" : "Google sign-in"}</button>
            </div>
            <p className="landing-entry-note">No account needed. Guest progress stays in this browser.</p>
            {!configured ? <p className="landing-status">Google sign-in is unavailable here. Guest practice is available.</p> : null}
            {denied ? <p className="landing-status" role="alert">Sign-in did not complete or this account is not approved. Try again or continue as a guest.</p> : null}
            {failed ? <p className="landing-status" role="alert">Could not start. Please try again; your saved progress has not changed.</p> : null}
          </div>
          <a className="landing-hero-caption" href="#try-it">Ein kleiner Anfang <span aria-hidden="true">↓</span></a>
        </section>
        <section className="landing-practice landing-section" id="try-it" aria-labelledby="cafe-heading">
          <div className="landing-practice-context">
            <h2 id="cafe-heading" lang="de">Im Café</h2>
            <p>Small words make a sentence yours.</p>
            <p className="landing-dialogue" lang="de">„Was möchtest du trinken?“<br />„Einen Kaffee mit Milch, bitte.“</p>
            <p className="landing-translation">“What would you like to drink?”<br />“A coffee with milk, please.”</p>
          </div>
          <div className="landing-exercise">
            <p className="landing-question" lang="de">Einen Kaffee <span className="landing-gap">{correct ? "mit" : "___"}</span> Milch, bitte.</p>
            <fieldset className="landing-choices">
              <legend>Which word means “with”?</legend>
              {["bei", "mit", "für"].map((word) => <button type="button" key={word} lang="de" className={`secondary${answer === word ? " selected" : ""}`} aria-pressed={answer === word} onClick={() => setAnswer(word)}>{word}</button>)}
            </fieldset>
            <div className="landing-answer" aria-live="polite">
              {answer ? <p>{correct ? <><strong lang="de">Richtig.</strong> <span lang="de">Mit Milch</span> means “with milk”. <span lang="de">Ohne Milch</span> means “without milk”.</> : <>Not quite. You want coffee <strong>with</strong> milk. Try another word.</>}</p> : null}
            </div>
            <dl className="landing-words">
              <div><dt lang="de">der Kaffee</dt><dd>coffee</dd></div>
              <div><dt lang="de">die Milch</dt><dd>milk</dd></div>
              <div><dt lang="de">bitte</dt><dd>please</dd></div>
            </dl>
          </div>
        </section>
        <section className="landing-path landing-section" aria-labelledby="practice-heading">
          <h2 id="practice-heading" lang="de">Wörter finden. Sätze verstehen.</h2>
          <div className="landing-path-copy">
            <p>Practise grammar, build your vocabulary and work through everyday conversations. Read, write and return to the words that need another look.</p>
            <p>Choose a topic, pick up where you left off and take the next sentence at your own pace.</p>
            <button type="button" disabled={pending !== null} onClick={() => { void enter("guest"); }}>Open practice</button>
          </div>
        </section>
        <section className="landing-privacy landing-section" id="privacy" aria-labelledby="privacy-heading">
          <h2 id="privacy-heading">Your learning stays yours</h2>
          <div className="landing-privacy-copy">
            <p>As a guest, progress is saved only in this browser. Clearing browser data removes it; you can export a backup from the Progress page.</p>
            <p>Google sign-in is limited to approved accounts. Signed-in progress is stored privately. Guest work is never automatically uploaded or assigned to an account.</p>
            <p>No advertising trackers. No account required to start practising.</p>
          </div>
        </section>
      </main>
      <footer className="landing-footer"><Logo /><p lang="de">Ein Satz nach dem anderen.</p><a href="#top">Back to top</a></footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ res, query }) => {
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  if (typeof query.error === "string" && query.error !== "signin") {
    return { redirect: { destination: "/?error=signin", permanent: false } };
  }
  return { props: { configured: authConfigured(), denied: typeof query.error === "string" } };
};
