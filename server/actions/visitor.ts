"use server"

// DONE REVIEWING: GITHUB COMMIT 1️⃣

import {Visitor} from "@prisma/client"
import {revalidatePath} from "next/cache"
import {redirect} from "next/navigation"
import {db} from "../db"

export const getVisitors = async function getVisitors() {
  const response = await db.visitor.findMany({include: {mosque: true}})
  return response
}

export const getVisitor = async function getVisitor(id: string) {
  const response = await db.visitor.findUnique({where: {id}, include: {mosque: true}})
  return response
}

export const createVisitor = async function createVisitor(visitor: Visitor) {
  await db.visitor.create({data: visitor})
  redirect("/dashboard/visitors")
}

export const updateVisitor = async function updateVisitor(id: string, visitor: Partial<Visitor>) {
  await db.visitor.update({where: {id}, data: visitor})
  redirect("/dashboard/visitors")
}

export const deleteVisitor = async function deleteVisitor(id: string) {
  await db.visitor.delete({where: {id}})
  revalidatePath("/dashboard", "page")
}
