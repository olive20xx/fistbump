"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { mutations } from "@/lib/graphql-queries"
import { useMutation } from "@apollo/client"

export default function ComboboxDemo({ getUsers, loggedUserId, cycleId }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [peerId, setPeerId] = React.useState(null)
  const [confirmationClicked, setConfirmationClicked] = React.useState(false)

  const [updatePeerReviews] = useMutation(mutations.UPDATE_PEER_REVIEWS)

  async function handleNominatePeer() {
    const mutationVars = {
      targetId: loggedUserId,
      cycleId: cycleId,
      input:
        { newReviewerId: peerId }
    }
    const { data: { updatePeerReview: { reviews: { peers } } } } = await updatePeerReviews({ variables: mutationVars })
    console.log('reviewerId is changing===>', peers)
    setConfirmationClicked(true);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={confirmationClicked}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
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
            {getUsers.map((user) => (
              <CommandItem
                key={user._id}
                onSelect={(currentValue) => {
                  setPeerId(user._id)
                  setValue(currentValue === user.fullName ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {user.fullName}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === user.fullName ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
      <Button disabled={confirmationClicked} onClick={handleNominatePeer}>Confirm</Button>
    </Popover>
  )
}
