"use client"

// DONE REVIEWING: GITHUB COMMIT

import {zodResolver} from "@hookform/resolvers/zod"
import {Mosque, Visitor} from "@prisma/client"
import Link from "next/link"
import {Fragment} from "react"
import {useForm} from "react-hook-form"
import {v4} from "uuid"
import {z} from "zod"
import {
  Button,
  Calendar,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "../../../../components/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../../../components/ui/select"
import {addVisitorsFormSchema} from "../../../../lib/form-schemas"
import {createVisitor, updateVisitor} from "../../../../server/actions/visitor"

type AddVisitorsFormType = {visitor?: Visitor; mosques: Mosque[]}

const AddVisitorsForm = function AddVisitorsForm({visitor, mosques}: AddVisitorsFormType) {
  const form = useForm<z.infer<typeof addVisitorsFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(addVisitorsFormSchema),
    defaultValues: {
      name: visitor?.name,
      phoneNumber: visitor?.phone_number,
      lastVisit: visitor?.last_visit || new Date(),
      mosque: visitor?.mosque_id
    }
  })

  const {isSubmitting} = form.formState
  const onSubmit = async function onSubmit(values: z.infer<typeof addVisitorsFormSchema>) {
    if (visitor?.id) {
      await updateVisitor(visitor.id, {
        name: values.name,
        phone_number: values.phoneNumber,
        last_visit: values.lastVisit,
        mosque_id: values.mosque
      })

      return
    }

    await createVisitor({
      id: v4(),
      name: values.name,
      phone_number: values.phoneNumber,
      last_visit: values.lastVisit,
      mosque_id: values.mosque,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  return (
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
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                </DatePicker>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="mosque"
          control={form.control}
          disabled={isSubmitting}
          render={({field}) => (
            <FormItem>
              <div className="flex w-full items-center justify-between">
                <FormLabel>Mosque</FormLabel>
                <Button variant="link" className="px-0" asChild>
                  <Link href="/dashboard/mosques/add">Create a mosque</Link>
                </Button>
              </div>
              <FormControl>
                <Select
                  defaultValue={
                    mosques.length === 0
                      ? "no-mosques"
                      : !field.value
                        ? "no-mosques-selected"
                        : field.value
                  }
                  onValueChange={field.onChange}
                  disabled={mosques.length === 0 || isSubmitting}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mosques.length === 0 ? (
                      <SelectItem value="no-mosques" disabled>
                        No mosques
                      </SelectItem>
                    ) : (
                      <Fragment>
                        {mosques.map((mosque) => (
                          <SelectItem key={mosque.id} value={mosque.id}>
                            {mosque.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="no-mosques-selected" disabled>
                          No mosques selected
                        </SelectItem>
                      </Fragment>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-3 self-start">
          {visitor
            ? isSubmitting
              ? "Updating..."
              : "Update"
            : isSubmitting
              ? "Adding..."
              : "Add Visitor"}
        </Button>
      </form>
    </Form>
  )
}

export default AddVisitorsForm
