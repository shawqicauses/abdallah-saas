"use client"

// DONE REVIEWING: GITHUB COMMIT

import {SignedIn, SignedOut, SignOutButton} from "@clerk/nextjs"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {Button} from "../../components/ui"

const NotFoundPage = function NotFoundPage() {
  const pathname = usePathname()
  return (
    <main className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semi-bold text-primary">404</p>
        <h1 className="mt-4 text-xl-3 font-bold tracking-tight text-foreground sm:text-xl-5">
          Page Not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Sorry.. we could not find{" "}
          <Button variant="outline" className="font-mono !opacity-100" disabled>
            {pathname}
          </Button>{" "}
          page that you are looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
          <SignedIn>
            <Button variant="link" asChild>
              <SignOutButton>Sign out</SignOutButton>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button variant="link" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
