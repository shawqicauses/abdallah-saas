// DONE REVIEWING: GITHUB COMMIT
import {z} from "zod"

export const addVisitorsFormSchema = z.object({
  name: z.string().min(2),
  phoneNumber: z.string().min(2),
  lastVisit: z.date().default(new Date()),
  mosque: z.string().min(2)
})
