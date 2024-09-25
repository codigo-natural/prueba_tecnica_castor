import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getSession(cookieStore) {
  const req = {
    headers: {
      cookie: cookieStore.toString(),
    },
  }
  const res = {}
  return getServerSession(req, res, authOptions)
}
