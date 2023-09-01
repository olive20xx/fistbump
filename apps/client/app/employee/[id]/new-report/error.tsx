'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

function Error({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Error...</h2>
      <div>{error.message}</div>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}

export default Error