"use client"

// DONE REVIEWING: GITHUB COMMIT

import {Prisma} from "@prisma/client"
import {format} from "date-fns"
import Link from "next/link"
import {useTransition} from "react"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../../../components/ui"
import {deleteVisitor} from "../../../../server/actions/visitor"

type VisitorsTableProps = {
  visitors: Prisma.VisitorGetPayload<{include: {mosque: true}}>[]
}

const VisitorsTable = function VisitorsTable({visitors}: VisitorsTableProps) {
  const [isPending, startTransition] = useTransition()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap">Name</TableHead>
          <TableHead className="whitespace-nowrap">Phone Number</TableHead>
          <TableHead className="whitespace-nowrap">Last Visit</TableHead>
          <TableHead className="whitespace-nowrap">Mosque</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visitors.map((visitor) => (
          <TableRow key={visitor.id}>
            <TableCell className="whitespace-nowrap">{visitor.name}</TableCell>
            <TableCell className="whitespace-nowrap font-mono">{visitor.phone_number}</TableCell>
            <TableCell className="whitespace-nowrap font-mono">
              {format(visitor.last_visit, "PPP")}
            </TableCell>
            <TableCell className="whitespace-nowrap">{visitor.mosque.name}</TableCell>
            <TableCell className="space-x-2 whitespace-nowrap">
              <Button variant="accent" disabled={isPending} asChild>
                <Link href={`/dashboard/visitors/edit/${visitor.id}`}>Edit</Link>
              </Button>
              <Button
                variant="outline"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    await deleteVisitor(visitor.id)
                  })
                }}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default VisitorsTable
