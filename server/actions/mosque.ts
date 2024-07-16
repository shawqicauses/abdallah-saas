"use server"

// DONE REVIEWING: GITHUB COMMIT 2️⃣

import {Mosque} from "@prisma/client"
import {revalidatePath} from "next/cache"
import {redirect} from "next/navigation"
import {db} from "../db"

export const getMosques = async function getMosques() {
  const response = await db.mosque.findMany({include: {visitors: true}})
  return response
}

export const getMosque = async function getMosque(id: string) {
  const response = await db.mosque.findUnique({where: {id}})
  return response
}

export const createMosque = async function createMosque(mosque: Mosque) {
  await db.mosque.create({data: mosque})
  redirect("/dashboard/mosques")
}

export const updateMosque = async function updateMosque(id: string, mosque: Partial<Mosque>) {
  await db.mosque.update({where: {id}, data: mosque})
  redirect("/dashboard/mosques")
}

export const deleteMosque = async function deleteMosque(id: string) {
  await db.mosque.delete({where: {id}})
  revalidatePath("/dashboard", "page")
}
