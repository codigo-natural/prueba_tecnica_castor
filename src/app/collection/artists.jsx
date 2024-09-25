import ArtistList from "@/components/ArtistList";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { getSession } from "next-auth/react";

export default function FollowedArtists({ followedArtists }) {
  return (
    <Layout title="Spotify - Your Library">
      <Heading text="Artists" />
      <ArtistList artists={followedArtists} />
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

  const followedArtists = await customGet(
    `https://api.spotify.com/v1/me/following?type=artist&limit=50`,
    session
  );

  return { props: { followedArtists: followedArtists.artists.items } };
};
