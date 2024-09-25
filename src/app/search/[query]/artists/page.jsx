'use client'

import ArtistList from "@/components/ArtistList";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
//import { getServerSession } from "next-auth/next";
import { useSession } from 'next-auth/react';

export default function SearchArtists({ params }) {
  //  const session = getServerSession();
  const { data: session } = useSession();
  console.log('session in query artists', session)

  if (!(isAuthenticated(session))) {
    // Redirigir a la página de inicio de sesión
    redirect("/login");
  }

  const query = params.query;
  const searchArtists = customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=artist&limit=50`,
    session
  );

  return (
    <Layout title="Spotify - Search">
      <Heading text={`All artists for "${query}"`} />
      <ArtistList artists={searchArtists.artists.items} />
    </Layout>
  );
}
