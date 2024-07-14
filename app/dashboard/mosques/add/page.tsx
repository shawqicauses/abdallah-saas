"use client"

// DONE REVIEWING: GITHUB COMMIT

import {zodResolver} from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {v4} from "uuid"
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
} from "../../../../components/ui"
import {createMosque} from "../../../../server/actions/mosque"

const AddMosquesFormSchema = z.object({
  name: z.string().min(2)
})

const AddMosquesPage = function AddMosquesPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof AddMosquesFormSchema>>({
    resolver: zodResolver(AddMosquesFormSchema),
    defaultValues: {name: ""}
  })

  const {isSubmitting} = form.formState
  const onSubmit = async function onSubmit(values: z.infer<typeof AddMosquesFormSchema>) {
    await createMosque({
      id: v4(),
      name: values.name,
      created_at: new Date(),
      updated_at: new Date()
    })

    router.replace("/dashboard/mosques")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Mosques</CardTitle>
        <CardDescription>Add mosques for your visitors.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-lg flex-col gap-3">
            <FormField
              name="name"
              control={form.control}
              disabled={isSubmitting}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-start">
              {isSubmitting ? "Adding..." : "Add Mosque"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default AddMosquesPage
