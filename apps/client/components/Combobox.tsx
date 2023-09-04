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

export const revalidate = 0
export const fetchCache = 'force-no-cache'
export default function NominationBox({ users, loggedUserId, cycleId }) {
  const [open, setOpen] = React.useState('')
  const [currentValue, setCurrentValue] = React.useState('')

  const [popoverStates, setPopoverStates] = React.useState([])
  const [peerId, setPeerId] = React.useState(null)
  const [peers, setPeers] = React.useState(null)
  const [updatePeerReviews] = useMutation(mutations.UPDATE_PEER_REVIEWS)
  const [getNominations] = useLazyQuery(queries.GET_PEER_REVIEWS)
  console.log(popoverStates)

  React.useEffect(() => {
    async function nominations() {
      const response = await getNominations({
        variables: { targetId: loggedUserId, cycleId },
      })

      const peers = response?.data?.getReport?.reviews?.peers

      if (peers && peers.length > 0) {
        console.log('nominations===>', peers)
        setPeers(peers)
        setPopoverStates(peers.map(() => ({ value: '', disabled: false })))
      } else {
        setPeers(null)
      }
    }
    nominations()
  }, [])

  async function handleNominatePeer(index) {
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
    console.log('reviewerId is changing===>', peers)
    const updatedPopoverStates = [...popoverStates]
    updatedPopoverStates[index] = {
      ...updatedPopoverStates[index],
      disabled: true,
    }
    setPopoverStates(updatedPopoverStates)
  }

  return !peers ? (
    <p>Loading</p>
  ) : (
    peers?.map((peer, index) => (
      <div className="pt-12" key={peer._id}>
        <Popover
          open={open === peer._id}
          onOpenChange={() => setOpen(peer._id)}
        >
          <PopoverTrigger asChild>
            <Button
              disabled={
                peer.reviewerId !== null || popoverStates[index].disabled
              }
              variant="outline"
              role="combobox"
              aria-expanded={open === peer._id}
              className="w-[200px] justify-between"
            >
              {popoverStates[index].value
                ? popoverStates[index].value
                : 'Select a peer'}
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
                      const updatedStates = [...popoverStates]
                      updatedStates[index].value =
                        value === user.fullName ? '' : value
                      setOpen('')
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
          <Button
            disabled={peer.reviewerId !== null || popoverStates[index].disabled}
            onClick={() => handleNominatePeer(index)}
          >
            Nominate
          </Button>
        </Popover>
      </div>
    ))
  )
}
