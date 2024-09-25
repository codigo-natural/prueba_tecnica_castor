'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({ showSpinner: false })

export default function NProgressHandler() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    nProgress.start()
    return () => {
      nProgress.done()
    }
  }, [pathname, searchParams])

  return null
}
