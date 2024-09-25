export const isAuthenticated = async (session) => {
  if (!session || !session.user) {
    return false
  }
  return Math.floor(Date.now()) < session.user.expires_at * 1000
}
