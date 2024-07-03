"use client"

// DONE REVIEWING: GITHUB COMMIT

import {useUser} from "@clerk/nextjs"
import {zodResolver} from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
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
} from "../../../components/ui"
import {upsertUser} from "../../../server/actions/user"

const onBoardingFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2)
})

const OnBoardingPage = function OnBoardingPage() {
  const userAuthenticated = useUser()
  const router = useRouter()

  const {firstName, lastName} = userAuthenticated.user || {}

  const form = useForm<z.infer<typeof onBoardingFormSchema>>({
    resolver: zodResolver(onBoardingFormSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || ""
    }
  })

  if (!userAuthenticated.user) return
  if (userAuthenticated.user.firstName || userAuthenticated.user.lastName)
    router.replace("/dashboard")

  const {isSubmitting} = form.formState
  const onSubmit = async function onSubmit(values: z.infer<typeof onBoardingFormSchema>) {
    await upsertUser({
      id: userAuthenticated.user.id!,
      first_name: values.firstName,
      last_name: values.lastName,
      username: userAuthenticated.user.username!,
      email: userAuthenticated.user.emailAddresses[0].emailAddress!,
      role: "USER"
    })

    router.replace("/dashboard")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="firstName"
          control={form.control}
          disabled={isSubmitting}
          render={({field}) => (
            <FormItem className="mb-4">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input defaultValue={firstName || ""} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="lastName"
          control={form.control}
          disabled={isSubmitting}
          render={({field}) => (
            <FormItem className="mb-4">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input defaultValue={lastName || ""} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{isSubmitting ? "Saving..." : "Save"}</Button>
      </form>
    </Form>
  )
}

export default OnBoardingPage
