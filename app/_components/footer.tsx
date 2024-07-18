// DONE REVIEWING: GITHUB COMMIT
import {TreePalmIcon} from "lucide-react"
import Link from "next/link"

const Footer = function Footer() {
  return (
    <footer className="mx-auto mt-20 max-w-xl-7 overflow-hidden px-6 pb-10 lg:px-8">
      <div className="flex w-full items-center justify-center gap-2">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary p-1.5 text-lg font-semi-bold text-primary-foreground md:h-10 md:w-10 md:text-base">
          <TreePalmIcon
            aria-hidden="true"
            className="h-4 w-4 transition-all group-hover:scale-110 md:h-5 md:w-5"
          />
          <span className="sr-only">Abd Allah SaaS</span>
        </Link>
        <p className="text-sm text-muted-foreground">
          By{" "}
          <Link
            href="https://instagram.com/shawqicauses"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-white">
            Shawqi Hatem
          </Link>
          .
        </p>
      </div>
      <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
        &copy; {new Date().getFullYear()} Abd Allah Application. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
