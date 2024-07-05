"use server"

// DONE REVIEWING: GITHUB COMMIT 1️⃣

import {User} from "@prisma/client"
import {db} from "../db"

export const upsertUser = async function upsertUser(user: User) {
  await db.user.upsert({
    where: {id: user.id},
    update: user,
    create: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role || "USER"
    }
  })
}

export const deleteUser = async function deleteUser(user: Partial<User>) {
  await db.user.delete({where: {id: user.id}})
}
