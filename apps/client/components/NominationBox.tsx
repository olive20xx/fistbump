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
import { ReportData, UserData } from '@/types/models'

export const revalidate = 0
export const fetchCache = 'force-no-cache'

export type NominationBoxProps = {
  users: UserData[],
  loggedUserId: string,
  cycleId: string,
  report: ReportData,
}

export default function NominationBox({ users, loggedUserId, cycleId, report }: NominationBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [currentValue, setCurrentValue] = React.useState('')
  const [value, setValue] = React.useState('')
  const [peerId, setPeerId] = React.useState(null)
  const [peerReviews, setPeerReviews] = React.useState(null)

  const [updatePeerReviews] = useMutation(mutations.UPDATE_PEER_REVIEWS)
  const [getNominationData] = useLazyQuery(queries.GET_PEER_REVIEWS)


  React.useEffect(() => {
    async function nominations() {
      const peerReviews = report.reviews.peers
      const filteredPeerReviews = peerReviews.filter((peer) => peer.reviewerId === null)
      setPeerReviews(filteredPeerReviews)
      console.log('nominations===>', peerReviews)

    }
    nominations()
  }, [report.reviews.peers])


  async function handleNominatePeer() {
    const variables = {
      targetId: loggedUserId,
      cycleId: cycleId,
      input: { newReviewerId: peerId },
    }
    const { data: { updatePeerReviewerId: { reviews: { peers } } } } = await updatePeerReviews({ variables })
    const filteredPeerReviews = peers.filter((peer) => peer.reviewerId === null)
    setPeerReviews(filteredPeerReviews)
  }

  return (
    (!peerReviews ? <p>Loading</p> :

      <div className="pt-12 flex gap-2">
        <Popover open={open} onOpenChange={() => setOpen(!open)} >
          <PopoverTrigger asChild>
            <Button
              disabled={peerReviews.length === 0}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="px-2 w-[200px] justify-between rounded-sm"
            >
              {value
                ? value
                : "Select a peer"}

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
                      setValue(value === user.fullName ? "" : value)
                      setOpen(false)

                    }}
                  >
                    {user.fullName}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentValue === user.fullName ? "opacity-100" : "opacity-0"

                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Button disabled={peerReviews.length === 0} onClick={handleNominatePeer}>Nominate</Button>
      </div>
    ))
}
