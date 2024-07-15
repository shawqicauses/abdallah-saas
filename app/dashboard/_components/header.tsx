"use client"

// DONE REVIEWING: GITHUB COMMIT 1️⃣

import {SignOutButton, UserButton} from "@clerk/nextjs"
import {ArrowLeftFromLineIcon, PanelLeft, SearchIcon, TreePalm} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {Fragment} from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetTrigger
} from "../../../components/ui"
import {links} from "./side-navigation"

const Header = function Header() {
  const pathname = usePathname()
  const pathnames = pathname.split("/")
  const breadcrumbs = pathnames.filter((element) => element !== "")

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="sm:hidden">
            <PanelLeft aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semi-bold text-primary-foreground md:text-base">
              <TreePalm
                aria-hidden="true"
                className="h-5 w-5 transition-all group-hover:scale-110"
              />
              <span className="sr-only">Abd Allah SaaS</span>
            </Link>
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                <link.icon aria-hidden="true" className="h-5 w-5" />
                {link.name}
              </Link>
            ))}
            <SignOutButton>
              <div className="flex cursor-pointer items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                <ArrowLeftFromLineIcon className="h-5 w-5" />
                Sign Out
              </div>
            </SignOutButton>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb) => (
            <Fragment key={breadcrumb}>
              <BreadcrumbItem className="capitalize">
                {breadcrumb !== breadcrumbs[breadcrumbs.length - 1] ? (
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">{breadcrumb}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {breadcrumb !== breadcrumbs[breadcrumbs.length - 1] && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[12.5rem] lg:w-[21rem]"
        />
      </div>
      <UserButton />
    </header>
  )
}

export default Header
