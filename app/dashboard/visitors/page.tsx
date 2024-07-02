// DONE REVIEWING: GITHUB COMMIT
import Image from "next/image"
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

const VisitorsPage = function VisitorsPage() {
  return (
    <main className="grid flex-1 items-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Visitors</CardTitle>
          <CardDescription>Check all visitors of all mosques.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[6.25rem] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yaWd4VzluTUhsN2JrYVA0N2g1NlZScGFWSGEiLCJyaWQiOiJ1c2VyXzJpaDNoMkpZUmtacEM0NWFNb2RhNjE4dmVlaSJ9"
                    alt="User #01 Image"
                    width={64}
                    height={64}
                    className="aspect-square rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">Shawqi Hatem</TableCell>
                <TableCell>+970 598 182 008</TableCell>
                <TableCell>01/07/2024</TableCell>
                <TableCell>
                  <Button variant="accent" className="mb-2 sm:mr-2">
                    Edit
                  </Button>
                  <Button variant="outline">Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}

export default VisitorsPage
