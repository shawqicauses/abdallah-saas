// DONE REVIEWING: GITHUB COMMIT 2️⃣

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../../../components/ui"
import {getMosques} from "../../../../server/actions/mosque"
import AddVisitorsForm from "../../_components/visitors/form"

const AddVisitorPage = async function AddVisitorPage() {
  const mosques = await getMosques()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Visitors</CardTitle>
        <CardDescription>Add visitors to your mosques.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddVisitorsForm mosques={mosques} />
      </CardContent>
    </Card>
  )
}

export default AddVisitorPage
