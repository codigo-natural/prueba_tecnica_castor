import { Suspense } from 'react';
import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SearchResults from "./SearchResults";

export default async function SearchPage({ params }) {
  const { query } = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <Suspense fallback={'...loading'}>
      <SearchResults query={query} session={session} />
    </Suspense>
  );
}