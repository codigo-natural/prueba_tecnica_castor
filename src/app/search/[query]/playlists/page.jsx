import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import PlaylistList from "@/components/PlaylistList";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { getServerSession } from "next-auth/next";

export default function SearchPlaylists({ params }) {
  const session = getServerSession();

  if (!(isAuthenticated(session))) {
    // Redirigir a la página de inicio de sesión
    redirect("/login");
  }

  const query = params.query;
  const searchPlaylists = customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=playlist&limit=50`,
    session
  );

  return (
    <Layout title="Spotify - Search">
      <Heading text={`All playlists for ${query}`} />
      <PlaylistList playlists={searchPlaylists.playlists.items} />
    </Layout>
  );
}
