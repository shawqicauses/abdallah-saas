"use client"

// DONE REVIEWING: GITHUB COMMIT

import {Prisma, Visitor} from "@prisma/client"
import {useSearchParams} from "next/navigation"
import {useEffect, useState, useTransition} from "react"
import {Calendar, DatePicker} from "../../components/ui"
import {getMosque} from "../../server/actions/mosque"
import {updateVisitor} from "../../server/actions/visitor"

/* eslint jsx-a11y/control-has-associated-label: "off" */

const MosquesVisitorsRow = function MosquesVisitorsRow({visitor}: {visitor: Visitor}) {
  const [isPending, startTransition] = useTransition()
  const [date, setDate] = useState<Date>(visitor.last_visit)

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6">
        {visitor.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 font-mono text-sm text-muted-foreground">
        {visitor.phone_number}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
        <DatePicker disabled={isPending} date={date}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(value) => setDate(value || new Date())}
            onDayBlur={() => {
              startTransition(async () => {
                await updateVisitor(visitor.id, {last_visit: date}, false)
              })
            }}
          />
        </DatePicker>
      </td>
    </tr>
  )
}

const MosquesVisitors = function MosquesVisitors() {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const mosqueId = searchParams.get("mosque")
  const [mosque, setMosque] = useState<Prisma.MosqueGetPayload<{include: {visitors: true}}> | null>(
    null
  )

  useEffect(() => {
    if (mosqueId)
      startTransition(async () => {
        const mosqueQuery = await getMosque(mosqueId)
        setMosque(mosqueQuery)
      })
  }, [mosqueId])

  if (!mosque) return

  return (
    <div className="relative z-20 mx-auto max-w-xl-7 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="max-w-lg sm:flex-auto">
          <h1 className="text-base font-semi-bold leading-6 text-foreground">
            Visitors of {mosque.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A list of all the visitors in our application database of {mosque.name} mosque.
            Including their name, phone number, and last visit.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border shadow ring-border ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/25">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semi-bold text-foreground sm:pl-6">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semi-bold text-foreground">
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semi-bold text-foreground">
                      Last Visit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {(isPending && (
                    <tr>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                        Loading
                      </td>
                    </tr>
                  )) ||
                    (mosque.visitors.length === 0 && (
                      <tr>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                          No visitors found
                        </td>
                      </tr>
                    )) ||
                    mosque.visitors.map((visitor) => (
                      <MosquesVisitorsRow key={visitor.id} visitor={visitor} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MosquesVisitors
