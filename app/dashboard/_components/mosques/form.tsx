"use client"

// DONE REVIEWING: GITHUB COMMIT

import {zodResolver} from "@hookform/resolvers/zod"
import {Mosque} from "@prisma/client"
import {useForm} from "react-hook-form"
import {v4} from "uuid"
import {z} from "zod"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "../../../../components/ui"
import {addMosquesFormSchema} from "../../../../lib/form-schemas"
import {createMosque, updateMosque} from "../../../../server/actions/mosque"

type AddMosquesFormType = {mosque?: Mosque}

const AddMosquesForm = function AddMosquesForm({mosque}: AddMosquesFormType) {
  const form = useForm<z.infer<typeof addMosquesFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(addMosquesFormSchema),
    defaultValues: {
      name: mosque?.name
    }
  })

  const {isSubmitting} = form.formState
  const onSubmit = async function onSubmit(values: z.infer<typeof addMosquesFormSchema>) {
    if (mosque?.id) {
      await updateMosque(mosque.id, {name: values.name})
      return
    }

    await createMosque({
      id: v4(),
      name: values.name,
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
        <Button type="submit" className="mt-3 self-start">
          {mosque
            ? isSubmitting
              ? "Updating..."
              : "Update"
            : isSubmitting
              ? "Adding..."
              : "Add Mosque"}
        </Button>
      </form>
    </Form>
  )
}

export default AddMosquesForm
