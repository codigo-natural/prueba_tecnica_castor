'use client'

const { SessionProvider } = require("next-auth/react")

function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default AuthProvider