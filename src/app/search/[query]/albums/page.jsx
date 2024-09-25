import AlbumList from "@/components/AlbumList";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { getServerSession } from "next-auth/next"; // Actualizado

export default function SearchAlbums({ params }) { // Cambiado a función asíncrona
  const session = getServerSession(); // Obtener sesión aquí
  const query = params.query; // Obtener query de params
  const searchAlbums = customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album&limit=50`,
    session
  );

  if (!(isAuthenticated(session))) {
    // Redirección si no está autenticado
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return (
    <Layout title="Spotify - Search">
      <Heading text={`All albums for "${query}"`} />
      <AlbumList albums={searchAlbums.albums.items} />
    </Layout>
  );
}
