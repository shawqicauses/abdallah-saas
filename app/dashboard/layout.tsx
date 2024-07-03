// DONE REVIEWING: GITHUB COMMIT 1️⃣
import {currentUser} from "@clerk/nextjs/server"
import {redirect} from "next/navigation"
import {PropsWithChildren} from "react"
import Header from "./_components/header"
import SideNavigation from "./_components/side-navigation"

const DashboardLayout = async function DashboardLayout({children}: PropsWithChildren) {
  const userAuthenticated = await currentUser()
  if (!userAuthenticated?.privateMetadata.role) redirect("/on-boarding")

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavigation />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
