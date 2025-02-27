'use client'

import AlbumList from "@/components/AlbumList";
import ArtistList from "@/components/ArtistList";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import TracksTable from "@/components/TracksTable";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { RiMusic2Fill } from "react-icons/ri";
import { useSession } from "next-auth/react";

export default async function SingleArtist({ params }) {
  const { data: session } = useSession();
  console.log('session in artistid page dinamic', session)
  const artistId = params.artistId;

  if (!(await isAuthenticated(session))) {
    redirect("/login");
  }

  const artist = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}`,
    session
  );

  const artistTracks = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=from_token`,
    session
  );

  const artistAlbums = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`,
    session
  );

  const artistSingles = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single`,
    session
  );

  const artistAppearsOn = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=appears_on`,
    session
  );

  const artistCompilation = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=compilation`,
    session
  );

  const relatedArtists = await customGet(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    session
  );

  return (
    <Layout title={`Spotify - ${artist?.name}`}>
      <div className="flex items-end gap-6">
        {artist && (
          <>
            {artist?.images?.length > 0 ? (
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="object-contain rounded-full w-52 h-52"
              />
            ) : (
              <div className="w-full h-40">
                <RiMusic2Fill className="w-full h-full bg-paper " />
              </div>
            )}
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-5xl font-bold">{artist.name}</h2>
              <span className="text-sm">
                {artist?.followers?.total?.toLocaleString()} followers
              </span>
              <div className="flex items-center gap-5 text-sm">
                {artist?.genres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <Heading text="Popular" />
        <div className="-mt-8">
          <TracksTable tracks={artistTracks} noAlbum noArtist />
        </div>
      </div>

      {artistAlbums?.items?.length > 0 && (
        <div className="mt-12">
          <Heading text="Albums" />
          <AlbumList albums={artistAlbums.items} />
        </div>
      )}

      {artistSingles?.items?.length > 0 && (
        <div className="mt-12">
          <Heading text="Singles" />
          <AlbumList albums={artistSingles.items} />
        </div>
      )}

      {artistAppearsOn?.items?.length > 0 && (
        <div className="mt-12">
          <Heading text="Appears on" />
          <AlbumList albums={artistAppearsOn?.items} />
        </div>
      )}

      {artistCompilation?.items?.length > 0 && (
        <div className="mt-12">
          <Heading text="Compilation" />
          <AlbumList albums={artistCompilation?.items} />
        </div>
      )}

      {relatedArtists?.artists?.length > 0 && (
        <div className="mt-12">
          <Heading text="Fans also like" />
          <ArtistList artists={relatedArtists?.artists} />
        </div>
      )}
    </Layout>
  );
}
