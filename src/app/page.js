'use client'

import { useEffect, useState } from 'react'
import AlbumList from '@/components/AlbumList'
import Heading from '@/components/Heading'
import Layout from '@/components/Layout'
import PlaylistList from '@/components/PlaylistList'
import { customGet } from '@/utils/customGet'
import { getGreeting } from '@/utils/getGreeting'
import { isAuthenticated } from '@/utils/isAuthenticated'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const [newReleases, setNewReleases] = useState(null)
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!(await isAuthenticated(session))) {
        router.push('/login')
        return
      }

      const newReleasesData = await customGet(
        'https://api.spotify.com/v1/browse/new-releases?country=IN&limit=25',
        session
      )
      setNewReleases(newReleasesData)

      const featuredPlaylistsData = await customGet(
        'https://api.spotify.com/v1/browse/featured-playlists?country=IN',
        session
      )
      setFeaturedPlaylists(featuredPlaylistsData)
    }

    fetchData()
  }, [session, router])

  return (
    <Layout title='Welcome to Spotify'>
      <h1 className='mb-5 text-3xl font-bold'>Good {getGreeting()}</h1>

      <Heading text='New releases' className='mt-10' />
      <AlbumList albums={newReleases?.albums?.items} />

      <Heading text={featuredPlaylists?.message} className='mt-16' />
      <PlaylistList playlists={featuredPlaylists?.playlists?.items} />
    </Layout>
  )
}
