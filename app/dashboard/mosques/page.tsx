// DONE REVIEWING: GITHUB COMMIT 1️⃣

import {CopyPlusIcon, PlusCircleIcon} from "lucide-react"
import Link from "next/link"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../../components/ui"
import {cn} from "../../../lib/utils"
import {getMosques} from "../../../server/actions/mosque"

const MosquesPage = async function MosquesPage() {
  const mosques = await getMosques()
  return (
    <Card className="flex flex-1 flex-col items-stretch justify-start">
      <CardHeader className="flex-col gap-3 space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <CardTitle>Mosques</CardTitle>
          <CardDescription>Check all mosques.</CardDescription>
        </div>
        <Button asChild>
          <Link href="/dashboard/mosques/add">
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            <span className="sm:whitespace-nowrap">Add Mosque</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent
        className={cn(
          "flex flex-1 justify-center",
          mosques.length === 0 ? "items-center" : "items-stretch p-0"
        )}>
        {mosques.length === 0 ? (
          <div className="w-fll flex h-full flex-col items-center justify-center">
            <CopyPlusIcon strokeWidth={1.5} className="size-12 text-primary md:size-20" />
            <h3 className="mt-4 text-xl font-semi-bold leading-none md:text-xl-2">No Mosques</h3>
            <p className="mt-1 text-base leading-relaxed text-muted-foreground md:text-lg">
              There are no mosques. Add one!
            </p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/mosques/add">
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                <span className="sm:whitespace-nowrap">Add Mosque</span>
              </Link>
            </Button>
          </div>
        ) : (
          "Table"
        )}
      </CardContent>
    </Card>
  )
}

export default MosquesPage
