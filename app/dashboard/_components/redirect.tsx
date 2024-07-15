"use client"

// DONE REVIEWING: GITHUB COMMIT

import {redirect, usePathname} from "next/navigation"
import {PropsWithChildren} from "react"

const DashboardRedirect = function DashboardRedirect({children}: PropsWithChildren) {
  const pathname = usePathname()
  if (pathname === "/dashboard") redirect("/dashboard/visitors")
  return children
}

export default DashboardRedirect
