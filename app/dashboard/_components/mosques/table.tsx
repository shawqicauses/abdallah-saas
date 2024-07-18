"use client"

// DONE REVIEWING: GITHUB COMMIT 1️⃣

import {Prisma} from "@prisma/client"
import {ExternalLinkIcon} from "lucide-react"
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
import {deleteMosque} from "../../../../server/actions/mosque"

type MosquesTableProps = {
  mosques: Prisma.MosqueGetPayload<{include: {visitors: true}}>[]
}

const MosquesTable = function MosquesTable({mosques}: MosquesTableProps) {
  const [isPending, startTransition] = useTransition()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap">Name</TableHead>
          <TableHead className="whitespace-nowrap">Location</TableHead>
          <TableHead className="whitespace-nowrap">Visitors</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mosques.map((mosque) => (
          <TableRow key={mosque.id}>
            <TableCell className="whitespace-nowrap">{mosque.name}</TableCell>
            <TableCell className="whitespace-nowrap">
              <Button variant="link" className="items-center gap-2" asChild>
                <Link href={mosque.location} target="_blank" rel="noreferrer">
                  <ExternalLinkIcon className="h-5 w-5 text-primary" />
                  View on Google Maps
                </Link>
              </Button>
            </TableCell>
            <TableCell className="whitespace-nowrap font-mono">{mosque.visitors.length}</TableCell>
            <TableCell className="space-x-2 whitespace-nowrap">
              <Button variant="accent" disabled={isPending} asChild>
                <Link href={`/dashboard/mosques/edit/${mosque.id}`}>Edit</Link>
              </Button>
              <Button
                variant="outline"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    await deleteMosque(mosque.id)
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

export default MosquesTable
