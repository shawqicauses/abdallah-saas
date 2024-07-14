"use client"

// DONE REVIEWING: GITHUB COMMIT

import {zodResolver} from "@hookform/resolvers/zod"
import {Mosque} from "@prisma/client"
import {useRouter} from "next/navigation"
import {useEffect, useState, useTransition} from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "../../../../../components/ui"
import {getMosque, updateMosque} from "../../../../../server/actions/mosque"

const EditMosquesFormSchema = z.object({
  name: z.string().min(2)
})

const EditMosquesPage = function EditMosquesPage({params: {id}}: {params: {id: string}}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [mosque, setMosque] = useState<Mosque | null>()
  const form = useForm<z.infer<typeof EditMosquesFormSchema>>({
    resolver: zodResolver(EditMosquesFormSchema),
    defaultValues: {name: mosque?.name}
  })

  useEffect(() => {
    startTransition(async () => {
      const response = await getMosque(id)
      if (response) setMosque(response)
    })
  }, [id])

  const {isSubmitting} = form.formState
  const onSubmit = async function onSubmit(values: z.infer<typeof EditMosquesFormSchema>) {
    if (!mosque?.id) return
    await updateMosque({id: mosque.id, name: values.name})
    router.replace("/dashboard/mosques")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Mosques</CardTitle>
        <CardDescription>Edit mosques for your visitors.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-lg flex-col gap-3">
            <FormField
              name="name"
              control={form.control}
              disabled={isPending || isSubmitting}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={mosque?.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending || isSubmitting} className="self-start">
              {isPending ? "Loading" : isSubmitting ? "Saving..." : "Save Mosque"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EditMosquesPage
