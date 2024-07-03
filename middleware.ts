// DONE REVIEWING: GITHUB COMMIT 1️⃣
import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/on-boarding", "/dashboard(.*)"])

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) auth().protect()
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}
