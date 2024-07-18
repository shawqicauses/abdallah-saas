"use client"

// DONE REVIEWING: GITHUB COMMIT

/* eslint import/no-extraneous-dependencies: "off" */

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from "@headlessui/react"
import {Mosque} from "@prisma/client"
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react"
import {useEffect, useState, useTransition} from "react"
import {Button} from "../../components/ui"
import {searchMosques} from "../../server/actions/mosque"

const MosquesSearch = function MosquesSearch() {
  const [isPending, startTransition] = useTransition()
  const [mosques, setMosques] = useState<Mosque[]>([])
  const [mosque, setMosque] = useState<Mosque | null>(null)
  const [query, setQuery] = useState<string | null>(null)

  useEffect(() => {
    if (query)
      startTransition(async () => {
        const mosquesQuery = await searchMosques(query)
        setMosques(mosquesQuery)
      })
  }, [query])

  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row">
      <Combobox
        as="div"
        value={mosque}
        className="flex-1"
        onChange={(value) => {
          setQuery(null)
          setMosque(value)
        }}>
        <div className="relative">
          <ComboboxInput
            displayValue={(value: Mosque) => value?.name || "Search Mosque"}
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setQuery(null)}
            className="shc-input-base"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronsUpDownIcon aria-hidden="true" className="h-5 w-5 text-muted" />
          </ComboboxButton>
          {mosques.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-muted/25 py-1 text-sm shadow-lg ring-1 ring-border ring-opacity-5 focus:outline-none">
              {mosques.map((element) => (
                <ComboboxOption
                  key={element.id}
                  value={element}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-foreground data-[focus]:bg-primary">
                  <span className="block truncate group-data-[selected]:font-semi-bold group-data-[focus]:text-white">
                    {element.name}
                  </span>
                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-primary group-data-[selected]:flex group-data-[focus]:text-white">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
      <Button disabled={mosque === null}>Search</Button>
    </div>
  )
}

export default MosquesSearch
