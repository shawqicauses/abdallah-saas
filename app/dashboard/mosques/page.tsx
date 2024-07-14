"use client"

// DONE REVIEWING: GITHUB COMMIT

import {Mosque} from "@prisma/client"
import {PlusCircleIcon} from "lucide-react"
import Link from "next/link"
import {Fragment, useEffect, useState, useTransition} from "react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../../components/ui"
import {deleteMosque, getMosques} from "../../../server/actions/mosque"

const MosquesPage = function MosquesPage() {
  const [isPending, startTransition] = useTransition()
  const [mounted, setMounted] = useState(false)
  const [refetch, setRefetch] = useState(new Date())
  const [mosques, setMosques] = useState<Mosque[] | []>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    startTransition(async () => {
      const response = await getMosques()
      if (response) setMosques(response)
    })
  }, [mounted, refetch])

  if (!mounted) return null

  return (
    <Fragment>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button disabled={isPending} asChild>
            <Link href="/dashboard/mosques/add">
              <PlusCircleIcon className="mr-2 h-5 w-5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Mosque</span>
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Mosques</CardTitle>
          <CardDescription>Check all mosques.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mosques.map((mosque) => (
                <TableRow key={mosque.id}>
                  <TableCell className="font-medium">{mosque.name}</TableCell>
                  <TableCell>
                    <Button variant="accent" disabled={isPending} className="mb-2 sm:mr-2" asChild>
                      <Link href={`/dashboard/mosques/edit/${mosque.id}`}>Edit</Link>
                    </Button>
                    <Button
                      variant="outline"
                      disabled={isPending}
                      onClick={() => {
                        startTransition(async () => {
                          await deleteMosque(mosque.id)
                          setRefetch(new Date())
                        })
                      }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default MosquesPage
