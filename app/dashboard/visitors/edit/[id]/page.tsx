// DONE REVIEWING: GITHUB COMMIT
import {redirect} from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../../../../components/ui"
import {getMosques} from "../../../../../server/actions/mosque"
import {getVisitor} from "../../../../../server/actions/visitor"
import AddVisitorsForm from "../../../_components/visitors/form"

type EditVisitorsProps = {
  params: {
    id: string
  }
}

const EditVisitors = async function EditVisitors({params: {id}}: EditVisitorsProps) {
  const visitor = await getVisitor(id)
  const mosques = await getMosques()
  if (!visitor) redirect("/dashboard/visitors")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Visitor - {visitor.name}</CardTitle>
        <CardDescription>Edit visitors information here.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddVisitorsForm visitor={visitor} mosques={mosques} />
      </CardContent>
    </Card>
  )
}

export default EditVisitors
