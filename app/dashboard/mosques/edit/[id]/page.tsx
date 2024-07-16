// DONE REVIEWING: GITHUB COMMIT 1️⃣
import {redirect} from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../../../../components/ui"
import {getMosque} from "../../../../../server/actions/mosque"
import AddMosquesForm from "../../../_components/mosques/form"

type EditMosquesProps = {
  params: {
    id: string
  }
}

const EditMosquesPage = async function EditMosquesPage({params: {id}}: EditMosquesProps) {
  const mosque = await getMosque(id)
  if (!mosque) redirect("/dashboard/mosques")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Mosque - {mosque.name}</CardTitle>
        <CardDescription>Edit mosques information here.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddMosquesForm mosque={mosque} />
      </CardContent>
    </Card>
  )
}

export default EditMosquesPage
