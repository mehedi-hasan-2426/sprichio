import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";
import "../styles/app.css";
import { ProgressProvider } from "../src/state/ProgressContext.tsx";
import { SessionProvider, useSession } from "next-auth/react";
import { CourseNavigation } from "../src/components/Sidebar.tsx";
import type { CourseSession } from "../src/server/auth.ts";
import type { NavWeek } from "../src/lib/weeks.ts";

type PageProps = { session?: CourseSession | null; guest?: boolean; courseNav?: NavWeek[] };

function CourseApp({ Component, pageProps }: AppProps<PageProps>) {
  const { data, status } = useSession();
  const session = data as CourseSession | null;
  const accountKey = pageProps.guest ? "guest" : session?.accountKey;
  if (!accountKey || (!pageProps.guest && status !== "authenticated")) {
    return <main className="session-notice"><h1>Sprichio</h1><p>{status === "loading" ? "Checking your session..." : "Your session has ended."}</p><Link href="/">Return to Sprichio</Link></main>;
  }
  return (
    <CourseNavigation.Provider value={pageProps.courseNav ?? []}>
      <ProgressProvider key={accountKey} accountKey={accountKey} guest={pageProps.guest}>
        <Component {...pageProps} />
      </ProgressProvider>
    </CourseNavigation.Provider>
  );
}

export default function App(props: AppProps<PageProps>) {
  const publicPage = props.router.pathname === "/" || props.router.pathname === "/signin";
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" key="description" content="Sprichio: practise German with grammar, vocabulary and everyday conversations." />
        <meta property="og:title" key="og-title" content="Sprichio | German practice" />
        <meta property="og:description" key="og-description" content="Grammar, words and everyday conversations. Practise German at your own pace." />
      </Head>
      {publicPage ? <props.Component {...props.pageProps} /> : <SessionProvider session={props.pageProps.session} refetchInterval={60} refetchOnWindowFocus><CourseApp {...props} /></SessionProvider>}
    </>
  );
}
