'use client'

import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Layout({ children, title }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section
        className={`w-full ${router.pathname === "/login" ? "" : "p-4"}`}
      >
        {children}
      </section>
    </>
  );
}