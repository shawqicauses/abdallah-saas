// DONE REVIEWING: GITHUB COMMIT 2️⃣
import {z} from "zod"

export const addMosquesFormSchema = z.object({
  name: z.string().min(2),
  location: z.string().url()
})

export const addVisitorsFormSchema = z.object({
  name: z.string().min(2),
  phoneNumber: z.string().min(2),
  lastVisit: z.date().default(new Date()),
  mosque: z.string().min(2)
})
