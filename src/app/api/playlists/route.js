import { getServerSession } from 'next-auth/next'
import { customGet } from '@/utils/customGet'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const playlists = await customGet(
    'https://api.spotify.com/v1/me/playlists',
    session
  )

  return NextResponse.json(playlists)
}
