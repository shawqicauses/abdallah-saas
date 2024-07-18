"use client"

// DONE REVIEWING: GITHUB COMMIT 1️⃣

import {redirect, usePathname} from "next/navigation"
import {PropsWithChildren} from "react"

const DashboardRedirect = function DashboardRedirect({children}: PropsWithChildren) {
  const pathname = usePathname()
  if (pathname === "/dashboard") redirect("/dashboard/mosques")
  return children
}

export default DashboardRedirect
