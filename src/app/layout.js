import localFont from 'next/font/local'
import { SpotifyProvider } from '@/context/SpotifyContext'
import PlayerProvider from '@/context/PlayerContext'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import PreviewPlayer from '@/components/PreviewPlayer'
import AuthProvider from '@/providers/AuthProvider'
import NProgressHandler from '@/components/NProgressHandler'
import './styles/globals.css'
import './styles/nonTailwind.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <SpotifyProvider>
            <PlayerProvider>
              <Sidebar />
              <div className='flex flex-col ml-64'>
                <Header />
                <main className='mt-4 ml-4'>
                  <NProgressHandler />
                  {children}
                </main>
              </div>
              <PreviewPlayer />
            </PlayerProvider>
          </SpotifyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
