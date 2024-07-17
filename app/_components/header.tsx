// DONE REVIEWING: GITHUB COMMIT

import {SignedIn, SignedOut} from "@clerk/nextjs"
import {LayoutDashboardIcon, TreePalmIcon} from "lucide-react"
import Link from "next/link"
import {Button} from "../../components/ui"

const Header = function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex flex-1">
          <Link
            href="/"
            className="group -m-1.5 flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary p-1.5 text-lg font-semi-bold text-primary-foreground md:h-10 md:w-10 md:text-base">
            <TreePalmIcon
              aria-hidden="true"
              className="h-4 w-4 transition-all group-hover:scale-110 md:h-5 md:w-5"
            />
            <span className="sr-only">Abd Allah SaaS</span>
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <SignedOut>
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button variant="ghost" className="gap-2" asChild>
              <Link href="/dashboard">
                <LayoutDashboardIcon aria-hidden="true" className="h-5 w-5 text-primary" />
                Admin Dashboard
              </Link>
            </Button>
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Header
