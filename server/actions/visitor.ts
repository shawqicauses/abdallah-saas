"use server"

// DONE REVIEWING: GITHUB COMMIT

import {Visitor} from "@prisma/client"
import {db} from "../db"

export const createVisitor = async function createVisitor(visitor: Visitor) {
  await db.visitor.create({
    data: visitor
  })
}
