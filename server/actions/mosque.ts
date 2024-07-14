"use server"

// DONE REVIEWING: GITHUB COMMIT

import {Mosque} from "@prisma/client"
import {db} from "../db"

export const getMosques = async function getMosques() {
  const response = await db.mosque.findMany()
  return response
}

export const getMosque = async function getMosque(id: string) {
  const response = await db.mosque.findUnique({where: {id}})
  return response
}

export const createMosque = async function createMosque(mosque: Mosque) {
  await db.mosque.create({
    data: mosque
  })
}

export const updateMosque = async function updateMosque(mosque: Partial<Mosque>) {
  await db.mosque.update({
    where: {id: mosque.id},
    data: mosque
  })
}

export const deleteMosque = async function deleteMosque(id: string) {
  await db.mosque.delete({where: {id}})
}
