// DONE REVIEWING: GITHUB COMMIT 2️⃣
import {SignOutButton} from "@clerk/nextjs"
import {ArrowLeftFromLineIcon, MoonIcon, TreePalm, UsersRoundIcon} from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../../../components/ui/tooltip"

export const links = [
  {
    id: 0,
    name: "Mosques",
    href: "/dashboard/mosques",
    icon: MoonIcon
  },
  {
    id: 1,
    name: "Visitors",
    href: "/dashboard/visitors",
    icon: UsersRoundIcon
  }
]

const SideNavigation = function SideNavigation() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semi-bold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <TreePalm aria-hidden="true" className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Abd Allah SaaS</span>
        </Link>
        <TooltipProvider>
          {links.map((link) => (
            <Tooltip key={link.id}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  <link.icon aria-hidden="true" className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.name}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SignOutButton>
                <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  <ArrowLeftFromLineIcon aria-hidden="true" className="h-5 w-5" />
                  <span className="sr-only">Sign Out</span>
                </div>
              </SignOutButton>
            </TooltipTrigger>
            <TooltipContent side="right">Sign Out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}

export default SideNavigation
