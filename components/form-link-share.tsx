'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Share2 } from 'lucide-react'
import { toast } from './ui/use-toast'

export default function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // avoiding window not defined error
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <div className="flex flex-grow items-center gap-4">
      <Input value={shareLink} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink)
          toast({
            title: 'Copied!',
            description: 'Link copied to clipboard',
          })
        }}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share link
      </Button>
    </div>
  )
}
