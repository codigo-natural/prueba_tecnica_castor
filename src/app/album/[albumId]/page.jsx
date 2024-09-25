'use client';

import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import Layout from "@/components/Layout";
import TracksTable from "@/components/TracksTable";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { RiMusic2Fill } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function SingleAlbum({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!(await isAuthenticated(session))) {
        router.push('/login');
        return;
      }

      const albumData = await customGet(`https://api.spotify.com/v1/albums/${params.albumId}`, session);
      setAlbum(albumData);
    };

    fetchAlbum();
  }, [session, params.albumId, router]);

  return (
    <Layout title={`Spotify - ${album?.name}`}>
      <div className="flex items-end gap-6">
        {album && (
          <>
            {album.images.length > 0 ? (
              <img
                src={album.images[0].url}
                alt={album.name}
                className="object-contain w-52 h-52"
              />
            ) : (
              <div className="w-full h-40">
                <RiMusic2Fill className="w-full h-full bg-paper " />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">
                {album.album_type}
              </h5>
              <h2 className="text-5xl font-bold">{album.name}</h2>

              <div className="flex items-center gap-5 text-sm">
                <span className="font-bold">{album.artists[0].name}</span>
                <span>{album.release_date}</span>
                {album.tracks.items.length > 0 && (
                  <span className="text-gray">{album?.tracks?.total} songs</span>
                )}{" "}
              </div>
            </div>
          </>
        )}
      </div>

      <Suspense fallback={<div>Loading tracks...</div>}>
        <TracksTable tracks={album?.tracks.items} noAlbum />
      </Suspense>
    </Layout>
  );
}
