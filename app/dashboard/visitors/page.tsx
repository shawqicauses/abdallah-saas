// DONE REVIEWING: GITHUB COMMIT 2️⃣
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
import {getVisitors} from "../../../server/actions/visitor"
import VisitorsTable from "../_components/visitors/table"

const VisitorsPage = async function VisitorsPage() {
  const visitors = await getVisitors()
  return (
    <Card className="flex flex-1 flex-col items-stretch justify-start">
      <CardHeader className="flex-col gap-3 space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <CardTitle>Visitors</CardTitle>
          <CardDescription>Check all visitors of all mosques.</CardDescription>
        </div>
        <Button asChild>
          <Link href="/dashboard/visitors/add">
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            <span className="sm:whitespace-nowrap">Add Visitor</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent
        className={cn(
          "flex flex-1 justify-center",
          visitors.length === 0 ? "items-center" : "items-stretch p-0"
        )}>
        {visitors.length === 0 ? (
          <div className="w-fll flex h-full flex-col items-center justify-center">
            <CopyPlusIcon strokeWidth={1.5} className="size-12 text-primary md:size-20" />
            <h3 className="mt-4 text-xl font-semi-bold leading-none md:text-xl-2">No Visitors</h3>
            <p className="mt-1 text-base leading-relaxed text-muted-foreground md:text-lg">
              There are no visitors. Add one!
            </p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/visitors/add">
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                <span className="sm:whitespace-nowrap">Add Visitor</span>
              </Link>
            </Button>
          </div>
        ) : (
          <VisitorsTable visitors={visitors} />
        )}
      </CardContent>
    </Card>
  )
}

export default VisitorsPage
