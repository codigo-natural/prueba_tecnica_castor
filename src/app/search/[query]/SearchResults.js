'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AlbumList from '@/components/AlbumList'
import ArtistList from '@/components/ArtistList'
import Heading from '@/components/Heading'
import PlaylistList from '@/components/PlaylistList'
import { customGet } from '@/utils/customGet'
import { fmtMSS } from '@/utils/formatDuration'
import { useSession } from 'next-auth/react'
import { useSpotify } from '@/context/SpotifyContext'

export default function SearchResults({ query }) {
  const [searchResults, setSearchResults] = useState(null)
  const { data: session } = useSession()

  const { setCurrentTrack } = useSpotify()

  console.log('set current track in serach query:', setCurrentTrack)

  const playTrack = (track) => {
    console.log('Track clicked:', track.name) // Ver si se detecta el clic
    if (track.preview_url) {
      console.log('Playing preview:', track.preview_url) // Ver si el preview_url está presente
      setCurrentTrack(track)
    } else {
      console.log('No preview available for this track')
    }
  }

  console.log('session search results:', session)

  useEffect(() => {
    const fetchResults = async () => {
      const results = await customGet(
        `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album,artist,track,playlist&limit=50`,
        session
      )
      console.log('search result:', searchResults)
      setSearchResults(results)
    }

    fetchResults()
  }, [query, session])

  if (!searchResults) return null

  return (
    <>
      <div className='mt-5'>
        <Link href={`/search/${query}/tracks`}>
          <Heading text='Songs' />
        </Link>

        {searchResults?.tracks?.items?.slice(0, 5).map((track) => (
          <div
            className={`grid grid-cols-12 col-span-12 p-1 ${
              !track.preview_url ? 'opacity-50' : ''
            }`}
            key={track.id}
          >
            <div className='flex items-center w-full col-span-11 my-3'>
              <div className='flex items-center w-full gap-4'>
                <div className='flex-shrink-0 w-10 h-10'>
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className='object-contain w-10 h-10'
                  />
                </div>

                <div className='w-full'>
                  <div
                    className={`w-10/12 text-sm font-medium truncate 
                      ${
                        track.preview_url
                          ? 'cursor-pointer hover:underline'
                          : 'cursor-default'
                      }`}
                    onClick={() => playTrack(track)}
                  >
                    {track.name}
                  </div>

                  <div className='flex flex-wrap items-center w-10/12 gap-1 text-sm text-gray'>
                    <span className='truncate '>
                      {track?.artists.map((artist, index) => (
                        <Link key={artist.id} href={`/artist/${artist.id}`}>
                          <span className='hover:text-white hover:underline'>
                            {index !== 0 ? `, ${artist.name}` : artist.name}
                          </span>
                        </Link>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center col-span-1 my-3 text-sm text-gray '>
              {fmtMSS(track.duration_ms)}
            </div>
          </div>
        ))}
      </div>

      {searchResults?.artists?.items?.length > 0 && (
        <div className='mt-5'>
          <Link href={`/search/${query}/artists`}>
            <Heading text='Artists' />
          </Link>
          <ArtistList artists={searchResults?.artists?.items?.slice(0, 6)} />
        </div>
      )}

      <div className='mt-5'>
        <Link href={`/search/${query}/albums`}>
          <Heading text='Albums' />
        </Link>
        <AlbumList albums={searchResults?.albums?.items?.slice(0, 6)} />
      </div>

      <div className='mt-5'>
        <Link href={`/search/${query}/playlists`}>
          <Heading text='Playlists' />
        </Link>
        <PlaylistList
          playlists={searchResults?.playlists?.items?.slice(0, 6)}
        />
      </div>
    </>
  )
}
