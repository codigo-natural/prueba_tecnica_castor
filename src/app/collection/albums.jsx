import AlbumList from "@/components/AlbumList";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { getSession } from "next-auth/react";

export default function Albums({ albums }) {
  return (
    <Layout title="Spotify - Your Library">
      <Heading text="Albums" />
      <AlbumList albums={albums} />
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!(await isAuthenticated(session))) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { items } = await customGet(
    `https://api.spotify.com/v1/me/albums?market=from_token&limit=50`,
    session
  );

  return { props: { albums: items.map((item) => item.album) } };
};
