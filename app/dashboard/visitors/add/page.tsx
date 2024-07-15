"use client"

// DONE REVIEWING: GITHUB COMMIT 1️⃣

import {zodResolver} from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {v4} from "uuid"
import {z} from "zod"
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "../../../../components/ui"
import {createVisitor} from "../../../../server/actions/visitor"

const addVisitorsFormSchema = z.object({
  name: z.string().min(2),
  phoneNumber: z.string().min(2),
  lastVisit: z.date()
})

const AddVisitorPage = function AddVisitorPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof addVisitorsFormSchema>>({
    resolver: zodResolver(addVisitorsFormSchema),
    defaultValues: {name: "", phoneNumber: "", lastVisit: new Date()}
  })

  const {isSubmitting} = form.formState
  const onSubmit = async function onSubmit(values: z.infer<typeof addVisitorsFormSchema>) {
    await createVisitor({
      id: v4(),
      name: values.name,
      phone_number: values.phoneNumber,
      last_visit: values.lastVisit,
      created_at: new Date(),
      updated_at: new Date()
    })

    router.replace("/dashboard/visitors")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Visitors</CardTitle>
        <CardDescription>Add visitors to your mosques.</CardDescription>
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
            <FormField
              name="phoneNumber"
              control={form.control}
              disabled={isSubmitting}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastVisit"
              control={form.control}
              disabled={isSubmitting}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Last Visit</FormLabel>
                  <FormControl>
                    <DatePicker date={field.value}>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </DatePicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-start">
              {isSubmitting ? "Adding..." : "Add Visitor"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default AddVisitorPage
