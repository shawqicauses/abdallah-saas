"use client"

// DONE REVIEWING: GITHUB COMMIT

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../../../components/ui"
import AddMosquesForm from "../../_components/mosques/form"

const AddMosquesPage = function AddMosquesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Mosques</CardTitle>
        <CardDescription>Add mosques for your visitors.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddMosquesForm />
      </CardContent>
    </Card>
  )
}

export default AddMosquesPage
