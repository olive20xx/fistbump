'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { mutations, queries } from '@/lib/graphql-queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Report, User } from '@/src/__generated__/graphql'

export const revalidate = 0
export const fetchCache = 'force-no-cache'
 
interface NominationBoxProps {
  users: User[]
  loggedUserId: string
  cycleId: string
  report: Report
}

export default function NominationBox({ users, loggedUserId, cycleId, report }: NominationBoxProps) {
 
  const [open, setOpen] = React.useState(false)
  const [currentValue, setCurrentValue] = React.useState('')
  const [value, setValue] = React.useState('')
  const [peerId, setPeerId] = React.useState(null)
  const [peers, setPeers] = React.useState(null)
  const [updatePeerReviews] = useMutation(mutations.UPDATE_PEER_REVIEWS)

  React.useEffect(() => {
    async function nominations() {
      const peers = report.reviews.peers
      const filteredPeers = peers.filter((peer) => peer.reviewerId === null)
      setPeers(filteredPeers)
      console.log('nominations===>', peers)
    }
    nominations()
  }, [report.reviews.peers])

  async function handleNominatePeer() {
    const mutationVars = {
      targetId: loggedUserId,
      cycleId: cycleId,
      input: { newReviewerId: peerId },
    }
    const {
      data: {
        updatePeerReviewerId: {
          reviews: { peers },
        },
      },
    } = await updatePeerReviews({ variables: mutationVars })
    const filteredPeers = peers.filter((peer) => peer.reviewerId === null)
    setPeers(filteredPeers)
  }

  return !peers ? (
    <p>Loading</p>
  ) : (
    <div>
      <Popover open={open} onOpenChange={() => setOpen(!open)}>
        <PopoverTrigger asChild>
          <Button
            disabled={peers.length === 0}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? value : 'Select a peer'}

            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Find a peer" className="h-9" />
            <CommandEmpty>No peer found</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user._id}
                  onSelect={(value) => {
                    setPeerId(user._id)
                    setValue(value === user.fullName ? '' : value)
                    setOpen(false)
                  }}
                >
                  {user.fullName}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentValue === user.fullName
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
        <Button disabled={peers.length === 0} onClick={handleNominatePeer}>
          Nominate
        </Button>
      </Popover>
    </div>
  )
}
