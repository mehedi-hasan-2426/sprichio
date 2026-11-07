import type { GetServerSideProps } from "next";

export default function LegacySignIn() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  return { redirect: { destination: typeof query.error === "string" ? "/?error=signin" : "/", permanent: false } };
};