import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import TracksTable from "@/components/TracksTable";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SearchTracks({ params }) {
  const { data: session } = useSession();
  const router = useRouter()
  const { query } = router.query
  console.log('query in tracks dinamic:', query)

  if (!(isAuthenticated(session))) {
    // Redirigir a la página de inicio de sesión
    redirect("/login");
  }

  //const query = params.query;
  const searchTracks = customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=track&limit=50`,
    session
  );

  return (
    <Layout title="Spotify - Search">
      <Heading text={`All songs for ${query}`} />
      <TracksTable tracks={searchTracks?.tracks.items} />
    </Layout>
  );
}
