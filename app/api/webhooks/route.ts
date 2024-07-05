// DONE REVIEWING: GITHUB COMMIT
import {WebhookEvent} from "@clerk/nextjs/server"
import {headers} from "next/headers"
import {Webhook} from "svix"
import {deleteUser, upsertUser} from "../../../server/actions/user"

/* eslint no-console: "off" */

const POST = async function POST(request: Request) {
  const {WEBHOOK_SECRET} = process.env
  if (!WEBHOOK_SECRET)
    throw new Error("Error occurred: Please set WEBHOOK_SECRET from Clerk dashboard in .env file.")

  const headerPayload = headers()
  const svixId = headerPayload.get("svix-id")
  const svixSignature = headerPayload.get("svix-signature")
  const svixTimestamp = headerPayload.get("svix-timestamp")

  if (!svixId || !svixSignature || !svixTimestamp)
    return new Response("Error occurred: Could not find (svix) headers.", {status: 400})

  const payload = await request.json()
  const body = JSON.stringify(payload)
  const webhook = new Webhook(WEBHOOK_SECRET)

  let event: WebhookEvent

  try {
    event = webhook.verify(body, {
      "svix-id": svixId,
      "svix-signature": svixSignature,
      "svix-timestamp": svixTimestamp
    }) as WebhookEvent
  } catch (error) {
    return new Response("Error occurred: Could not verify webhook.", {status: 400})
  }

  const {data, type} = event

  if (type === "user.created" || type === "user.updated")
    await upsertUser({
      id: data.id,
      username: data.username || data.id,
      email: data.email_addresses[0].email_address,
      role: "USER"
    })

  if (type === "user.deleted") await deleteUser({id: data.id})

  return new Response("Success", {status: 200})
}

export {POST}
