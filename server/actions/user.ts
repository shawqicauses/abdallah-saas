"use server"

// DONE REVIEWING: GITHUB COMMIT

import {clerkClient, currentUser} from "@clerk/nextjs/server"
import {User} from "@prisma/client"
import {db} from "../db"

export const upsertUser = async function upsertUser(user: User) {
  const userAuthenticated = await currentUser()
  if (!userAuthenticated) return

  const response = await db.user.upsert({
    where: {id: userAuthenticated.id},
    update: user,
    create: {
      id: userAuthenticated.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: userAuthenticated.username!,
      email: userAuthenticated.emailAddresses[0].emailAddress,
      role: user.role || "USER"
    }
  })

  await clerkClient.users.updateUserMetadata(userAuthenticated.id, {
    privateMetadata: {
      role: response.role || "USER"
    }
  })

  await clerkClient.users.updateUser(userAuthenticated.id, {
    firstName: user.first_name,
    lastName: user.last_name
  })
}

export default upsertUser
